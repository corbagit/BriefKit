import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db/connection.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// PayPal config
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'sb';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'sb';
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
const isMock = !PAYPAL_CLIENT_ID || PAYPAL_CLIENT_ID === 'sb' || PAYPAL_CLIENT_ID === 'placeholder';

const PAYPAL_API = PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const PLANS = {
  pro: { name: 'Pro', price: 9, summariesPerMonth: 50 },
  unlimited: { name: 'Unlimited', price: 19, summariesPerMonth: 99999 }
};

/**
 * Get a PayPal access token using client credentials grant.
 */
async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

/**
 * Get the PayPal product ID for a given tier, creating it if needed.
 */
async function getOrCreateProduct(token, tier) {
  const plan = PLANS[tier];
  if (!plan) throw new Error(`Unknown tier: ${tier}`);

  // Try to find existing product
  const listRes = await fetch(`${PAYPAL_API}/v1/catalogs/products?page_size=20`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  const listData = await listRes.json();
  const existing = listData.products?.find(p => p.name === `CorbaBriefKit ${plan.name}`);
  if (existing) return existing.id;

  // Create product
  const createRes = await fetch(`${PAYPAL_API}/v1/catalogs/products`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `CorbaBriefKit ${plan.name}`,
      description: `${plan.name} plan — ${plan.summariesPerMonth === 99999 ? 'Unlimited' : plan.summariesPerMonth + ' per month'} summaries`,
      type: 'SERVICE',
      category: 'SOFTWARE',
    }),
  });
  const product = await createRes.json();
  return product.id;
}

/**
 * Get or create a PayPal plan (billing plan) for the given tier.
 * Returns the plan ID.
 */
async function getOrCreatePlan(token, tier) {
  const plan = PLANS[tier];
  const productId = await getOrCreateProduct(token, tier);

  // List existing plans
  const listRes = await fetch(`${PAYPAL_API}/v1/billing/plans?page_size=20`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  const listData = await listRes.json();
  const existing = listData.plans?.find(p => p.name === `CorbaBriefKit ${plan.name} Monthly`);
  if (existing) return existing.id;

  // Create plan
  const createRes = await fetch(`${PAYPAL_API}/v1/billing/plans`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: productId,
      name: `CorbaBriefKit ${plan.name} Monthly`,
      description: `${plan.name} plan — $${plan.price}/month`,
      billing_cycles: [
        {
          frequency: { interval_unit: 'MONTH', interval_count: 1 },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: { value: String(plan.price), currency_code: 'USD' },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: { value: '0', currency_code: 'USD' },
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3,
      },
    }),
  });
  const planData = await createRes.json();
  return planData.id;
}

// Public: Get plans info
router.get('/plans', (req, res) => {
  res.json({
    plans: [
      { id: 'free', name: 'Free', price: 0, summariesPerMonth: 5, description: '5 summaries/month' },
      { id: 'pro', name: 'Pro', price: 9, summariesPerMonth: 50, description: '50 summaries/month — $9/mo' },
      { id: 'unlimited', name: 'Unlimited', price: 19, summariesPerMonth: 99999, description: 'Unlimited summaries — $19/mo' },
    ],
  });
});

// All routes below require auth
router.use(authMiddleware);

/**
 * GET /api/paypal/subscription/:id
 * Look up a PayPal subscription in the database
 */
router.get('/subscription/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const sub = db.prepare(
    'SELECT * FROM subscriptions WHERE id = ? AND user_id = ?'
  ).get(id, req.user.id);
  if (!sub) return res.status(404).json({ error: 'Subscription not found' });
  res.json({ subscription: sub });
});

/**
 * POST /api/paypal/create-order
 * Create a PayPal order for subscription payment
 * Body: { tier: 'pro' | 'unlimited' }
 */
router.post('/create-order', async (req, res) => {
  const { tier } = req.body;
  if (!tier || !['pro', 'unlimited'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid tier. Must be "pro" or "unlimited".' });
  }

  const plan = PLANS[tier];

  if (isMock) {
    // Mock mode — return a fake approval URL
    const db = getDb();
    const orderId = `MOCK_ORDER_${uuidv4().slice(0, 8).toUpperCase()}`;

    // Cancel any existing active subscriptions
    db.prepare("UPDATE subscriptions SET status = 'canceled' WHERE user_id = ? AND status = 'active'").run(req.user.id);

    return res.json({
      id: orderId,
      status: 'CREATED',
      links: [
        {
          href: `${req.headers.origin || 'http://localhost:3000'}/api/paypal/mock-approve?orderId=${orderId}&tier=${tier}`,
          rel: 'approve',
          method: 'GET',
        },
      ],
    });
  }

  // Real PayPal mode
  try {
    const token = await getAccessToken();
    const planId = await getOrCreatePlan(token, tier);

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': `${req.user.id}_${Date.now()}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: tier,
            description: `CorbaBriefKit ${plan.name} — $${plan.price}/month`,
            amount: { currency_code: 'USD', value: String(plan.price) },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW',
              return_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?paypal=success`,
              cancel_url: `${req.headers.origin || 'http://localhost:3000'}/pricing?paypal=canceled`,
            },
          },
        },
      }),
    });

    const order = await orderRes.json();
    if (!order.id) {
      return res.status(500).json({ error: 'Failed to create PayPal order', details: order });
    }

    // Store order reference in the DB
    const db = getDb();
    db.prepare(
      'INSERT INTO subscriptions (id, user_id, paypal_subscription_id, status, tier, payment_provider, current_period_start) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(uuidv4(), req.user.id, order.id, 'pending', tier, 'paypal', new Date().toISOString());

    // Find the approval URL
    const approveLink = order.links?.find(l => l.rel === 'payer-action') || order.links?.find(l => l.rel === 'approve');

    res.json({
      id: order.id,
      status: order.status,
      links: order.links,
      approveUrl: approveLink?.href,
    });
  } catch (err) {
    console.error('[paypal] create-order error:', err);
    res.status(500).json({ error: 'Failed to create PayPal order', message: err.message });
  }
});

/**
 * POST /api/paypal/capture-order
 * Capture payment after buyer approves
 * Body: { orderId: string, tier: string }
 */
router.post('/capture-order', async (req, res) => {
  const { orderId, tier } = req.body;
  if (!orderId) return res.status(400).json({ error: 'orderId is required' });

  if (!tier || !['pro', 'unlimited'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  if (isMock) {
    // Mock mode — activate subscription
    const db = getDb();
    const subId = uuidv4();
    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + 1);

    // Cancel any existing active subscriptions
    db.prepare("UPDATE subscriptions SET status = 'canceled' WHERE user_id = ? AND status = 'active'").run(req.user.id);

    db.prepare(
      'INSERT INTO subscriptions (id, user_id, paypal_subscription_id, status, tier, payment_provider, current_period_start, current_period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(subId, req.user.id, `mock_${orderId.slice(0, 8)}`, 'active', tier, 'paypal', now.toISOString(), end.toISOString());

    db.prepare("UPDATE users SET subscription_tier = ?, subscription_status = 'active' WHERE id = ?").run(tier, req.user.id);

    return res.json({
      success: true,
      subscription: { id: subId, tier, status: 'active', paymentProvider: 'paypal' },
    });
  }

  // Real PayPal mode
  try {
    const token = await getAccessToken();
    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = await captureRes.json();
    if (capture.status !== 'COMPLETED' && capture.status !== 'APPROVED') {
      return res.status(400).json({ error: 'Payment not completed', status: capture.status, details: capture });
    }

    // Activate the subscription
    const db = getDb();
    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth() + 1);

    // Find the pending subscription
    const existing = db.prepare(
      "SELECT id FROM subscriptions WHERE paypal_subscription_id = ? AND user_id = ? AND status = 'pending'"
    ).get(orderId, req.user.id);

    let subId;
    if (existing) {
      subId = existing.id;
      db.prepare(
        "UPDATE subscriptions SET status = 'active', tier = ?, current_period_start = ?, current_period_end = ?, updated_at = ? WHERE id = ?"
      ).run(tier, now.toISOString(), end.toISOString(), now.toISOString(), subId);
    } else {
      subId = uuidv4();
      db.prepare(
        'INSERT INTO subscriptions (id, user_id, paypal_subscription_id, status, tier, payment_provider, current_period_start, current_period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(subId, req.user.id, orderId, 'active', tier, 'paypal', now.toISOString(), end.toISOString());
    }

    db.prepare("UPDATE users SET subscription_tier = ?, subscription_status = 'active' WHERE id = ?").run(tier, req.user.id);

    res.json({
      success: true,
      subscription: { id: subId, tier, status: 'active', paymentProvider: 'paypal' },
      captureDetails: capture,
    });
  } catch (err) {
    console.error('[paypal] capture-order error:', err);
    res.status(500).json({ error: 'Failed to capture PayPal order', message: err.message });
  }
});

/**
 * Mock approval endpoint — for testing the mock flow
 */
router.get('/mock-approve', (req, res) => {
  const { orderId, tier } = req.query;
  if (!orderId || !tier) {
    return res.status(400).json({ error: 'Missing orderId or tier' });
  }
  // Simulate successful capture by calling the capture endpoint
  // We just redirect to the frontend with success
  res.redirect(`${req.headers.origin || 'http://localhost:3000'}/dashboard?paypal=success&orderId=${orderId}&tier=${tier}`);
});

export default router;