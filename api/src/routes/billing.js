import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import { getDb } from '../db/connection.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const stripe = process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder'
  ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const PLANS = {
  pro: { name: 'Pro', price: 9, summariesPerMonth: 50 },
  unlimited: { name: 'Unlimited', price: 19, summariesPerMonth: 99999 }
};

router.get('/plans', (req, res) => {
  res.json({
    plans: [
      { id: 'free', name: 'Free', price: 0, summariesPerMonth: 5, description: '5 summaries/month' },
      { id: 'pro', name: 'Pro', price: 9, summariesPerMonth: 50, description: '50 summaries/month — $9/mo' },
      { id: 'unlimited', name: 'Unlimited', price: 19, summariesPerMonth: 99999, description: 'Unlimited summaries — $19/mo' }
    ]
  });
});

router.use(authMiddleware);

router.get('/subscription', (req, res) => {
  const db = getDb();
  const sub = db.prepare("SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1").get(req.user.id);
  const user = db.prepare('SELECT subscription_tier, subscription_status FROM users WHERE id = ?').get(req.user.id);
  res.json({ subscription: sub || null, plan: user?.subscription_tier ? PLANS[user.subscription_tier] || null : null, status: user?.subscription_status || 'inactive' });
});

router.post('/create-checkout-session', async (req, res) => {
  const { tier } = req.body;
  if (!tier || !['pro', 'unlimited'].includes(tier)) return res.status(400).json({ error: 'Invalid tier' });

  if (!stripe) {
    // Mock mode
    const db = getDb();
    const subId = uuidv4();
    const now = new Date();
    const end = new Date(now); end.setMonth(end.getMonth() + 1);
    db.prepare("UPDATE subscriptions SET status = 'canceled' WHERE user_id = ?").run(req.user.id);
    db.prepare('INSERT INTO subscriptions (id, user_id, stripe_subscription_id, stripe_price_id, status, tier, current_period_start, current_period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(subId, req.user.id, `mock_${subId.slice(0,8)}`, `price_${tier}`, 'active', tier, now.toISOString(), end.toISOString());
    db.prepare("UPDATE users SET subscription_tier = ?, subscription_status = 'active' WHERE id = ?").run(tier, req.user.id);
    return res.json({ success: true, subscription: { id: subId, tier, status: 'active' } });
  }

  // Real Stripe
  try {
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, name: user.name, metadata: { user_id: user.id } });
      customerId = customer.id;
      db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?').run(customerId, user.id);
    }
    const session = await stripe.checkout.sessions.create({
      customer: customerId, mode: 'subscription', payment_method_types: ['card'],
      line_items: [{ price: process.env[`STRIPE_PRICE_${tier.toUpperCase()}`] || `price_${tier}`, quantity: 1 }],
      success_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?checkout=success`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/pricing?checkout=canceled`,
      metadata: { user_id: user.id, tier }
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

router.post('/webhook', async (req, res) => {
  if (!stripe) return res.json({ received: true });
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  const db = getDb();
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, tier } = session.metadata;
    const subId = uuidv4();
    const now = new Date();
    const end = new Date(now); end.setMonth(end.getMonth() + 1);
    db.prepare('INSERT INTO subscriptions (id, user_id, stripe_subscription_id, stripe_price_id, status, tier, current_period_start, current_period_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
      .run(subId, user_id, session.subscription, session.metadata.price_id || `price_${tier}`, 'active', tier, now.toISOString(), end.toISOString());
    db.prepare("UPDATE users SET subscription_tier = ?, subscription_status = 'active' WHERE id = ?").run(tier, user_id);
  }
  res.json({ received: true });
});

export default router;
