import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db/connection.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

const LIMITS = { free: 5, pro: 50, unlimited: 99999 };

// Generate a mock summary
function mockSummary(text, url) {
  const title = url ? `Summary of ${url.replace(/https?:\/\//, '').slice(0, 40)}...` : 'Content Summary';
  return {
    title,
    summary: `${text.slice(0, 100)}... This content covers key concepts and actionable insights. The main argument centers around practical applications of these ideas in real-world scenarios.`,
    key_takeaways: JSON.stringify([
      'The core principle is to focus on actionable outcomes rather than theoretical knowledge',
      'Implementation requires consistent effort and the right framework',
      'Measuring results helps iterate and improve over time',
      'Combining multiple approaches yields better results than any single method'
    ]),
    actionable_insights: JSON.stringify([
      'Start with a 15-minute daily practice to build momentum',
      'Use the 80/20 rule to identify the most impactful actions',
      'Track your progress weekly and adjust your approach',
      'Share your learnings with others to reinforce understanding'
    ])
  };
}

// POST /api/summaries/create
router.post('/create', (req, res) => {
  const db = getDb();
  const { url, text } = req.body;
  if (!url && !text) return res.status(400).json({ error: 'Provide url or text' });

  const user = db.prepare('SELECT subscription_tier, summaries_count FROM users WHERE id = ?').get(req.user.id);
  const limit = LIMITS[user.subscription_tier] || 5;
  
  // Count summaries this month
  const thisMonth = db.prepare("SELECT COUNT(*) as c FROM summaries WHERE user_id = ? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')").get(req.user.id).c;
  if (thisMonth >= limit) return res.status(403).json({ error: `Monthly limit reached (${limit}). Upgrade to continue.` });

  const source = text || url;
  const id = uuidv4();
  const mock = mockSummary(source, url);
  
  db.prepare(`INSERT INTO summaries (id, user_id, source_url, source_text, title, summary, key_takeaways, actionable_insights) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, req.user.id, url || null, text || null, mock.title, mock.summary, mock.key_takeaways, mock.actionable_insights);
  db.prepare('UPDATE users SET summaries_count = summaries_count + 1 WHERE id = ?').run(req.user.id);

  const summary = db.prepare('SELECT * FROM summaries WHERE id = ?').get(id);
  res.status(201).json({ summary });
});

// GET /api/summaries
router.get('/', (req, res) => {
  const db = getDb();
  const summaries = db.prepare('SELECT id, title, source_url, source_text, created_at FROM summaries WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  const total = db.prepare('SELECT COUNT(*) as c FROM summaries WHERE user_id = ?').get(req.user.id).c;
  res.json({ summaries, total });
});

// GET /api/summaries/:id
router.get('/:id', (req, res) => {
  const db = getDb();
  const summary = db.prepare('SELECT * FROM summaries WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
  if (!summary) return res.status(404).json({ error: 'Summary not found' });
  summary.key_takeaways = JSON.parse(summary.key_takeaways || '[]');
  summary.actionable_insights = JSON.parse(summary.actionable_insights || '[]');
  res.json({ summary });
});

// GET /api/summaries/usage/stats — current usage vs limits
router.get('/usage/stats', (req, res) => {
  const db = getDb();
  const user = db.prepare('SELECT subscription_tier FROM users WHERE id = ?').get(req.user.id);
  const limit = LIMITS[user.subscription_tier] || 5;
  const used = db.prepare("SELECT COUNT(*) as c FROM summaries WHERE user_id = ? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')").get(req.user.id).c;
  res.json({ tier: user.subscription_tier, used, limit, remaining: limit - used });
});

export default router;
