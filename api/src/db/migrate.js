import { getDb } from './connection.js';

const MIGRATIONS = [
  {
    version: 1,
    name: 'initial_schema',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        subscription_tier TEXT DEFAULT 'free',
        subscription_status TEXT DEFAULT 'active',
        summaries_count INTEGER DEFAULT 0,
        stripe_customer_id TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS summaries (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        source_url TEXT,
        source_text TEXT,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        key_takeaways TEXT,
        actionable_insights TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        stripe_subscription_id TEXT,
        stripe_price_id TEXT,
        status TEXT DEFAULT 'incomplete',
        tier TEXT DEFAULT 'free',
        current_period_start TEXT,
        current_period_end TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_summaries_user_id ON summaries(user_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
    `
  }
];

export function runMigrations() {
  const db = getDb();
  db.exec(`CREATE TABLE IF NOT EXISTS _migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT DEFAULT (datetime('now')))`);
  const applied = db.prepare('SELECT version FROM _migrations').all().map(r => r.version);
  
  for (const m of MIGRATIONS) {
    if (!applied.includes(m.version)) {
      console.log(`[migrate] Applying v${m.version}: ${m.name}`);
      db.exec(m.sql);
      db.prepare('INSERT INTO _migrations (version, name) VALUES (?, ?)').run(m.version, m.name);
    }
  }
}
