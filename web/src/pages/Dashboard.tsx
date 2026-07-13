import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { summariesApi } from '../services/api';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

interface Summary {
  id: string;
  title: string;
  source_url: string | null;
  source_text: string | null;
  created_at: string;
}

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [usage, setUsage] = useState<{ used: number; limit: number; remaining: number } | null>(null);

  const fetchData = async () => {
    try {
      const [listRes, usageRes] = await Promise.all([
        summariesApi.list(),
        summariesApi.usage(),
      ]);
      setSummaries(listRes.summaries);
      setUsage(usageRes);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        setError('Failed to load summaries');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setCreating(true);
    setError('');

    try {
      const isUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
      const data = isUrl
        ? await summariesApi.create({ url: trimmed })
        : await summariesApi.create({ text: trimmed });

      await refreshUser();
      navigate(`/summary/${data.summary.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create summary. Check your usage limit.');
      setCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreate();
    }
  };

  const filtered = summaries.filter(s =>
    !search || s.title.toLowerCase().includes(search.toLowerCase())
  );

  const usagePercent = usage ? Math.round((usage.used / usage.limit) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '40px 0 60px',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', marginBottom: 4 }}>Welcome back,</p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: '#F8FAFC',
              }}>
                {user?.name || 'User'}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigate('/settings')}
                className="btn btn-dark"
                style={{ padding: '10px 20px' }}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Input area */}
          <div className="card-dark" style={{ padding: '24px', transform: 'none' }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, color: '#F8FAFC', marginBottom: 12 }}>
              Paste article URL or text...
            </label>
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <textarea
                className="input input-dark"
                style={{
                  minHeight: 80,
                  resize: 'vertical',
                  lineHeight: 1.6,
                  padding: '16px',
                  fontSize: 'var(--text-base)',
                }}
                placeholder="https://example.com/article or paste your text here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <button
                    onClick={handleCreate}
                    className="btn btn-primary"
                    style={{ padding: '12px 28px', fontSize: 'var(--text-base)' }}
                    disabled={creating || !input.trim()}
                  >
                    {creating ? 'Summarizing…' : 'Summarize →'}
                  </button>
                  {error && (
                    <span style={{ color: '#EF4444', fontSize: 'var(--text-sm)' }}>{error}</span>
                  )}
                </div>
                {usage && (
                  <span style={{ color: '#64748B', fontSize: 'var(--text-sm)' }}>
                    {usage.used}/{usage.limit} this month
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: '-20px', position: 'relative', zIndex: 10 }}>
        {/* Usage meter */}
        {usage && (
          <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
                Monthly Usage — <strong style={{ textTransform: 'capitalize', color: 'var(--light-text-main)' }}>{usage.tier}</strong> plan
              </span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                {usage.used} / {usage.limit} summaries
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--light-bg-input)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(usagePercent, 100)}%`,
                height: '100%',
                background: `linear-gradient(90deg, var(--brand-primary), ${usagePercent > 80 ? 'var(--color-danger)' : 'var(--brand-secondary)'})`,
                borderRadius: 99,
                transition: 'width 0.5s ease',
              }} />
            </div>
            {usage.remaining === 0 && (
              <p style={{ marginTop: 8, fontSize: 'var(--text-sm)', color: 'var(--color-danger)' }}>
                You've hit your monthly limit.{' '}
                <a href="/settings" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>Upgrade to continue</a>
              </p>
            )}
          </div>
        )}

        {/* Search / Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            Recent Summaries
          </h2>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <input
              className="input"
              placeholder="Search summaries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px', fontSize: 'var(--text-sm)' }}
            />
          </div>
        </div>

        {/* Summaries list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{
              width: 32,
              height: 32,
              border: '3px solid var(--light-border)',
              borderTopColor: 'var(--brand-primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }} />
            <p style={{ color: 'var(--light-text-muted)' }}>Loading summaries…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px', transform: 'none' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>📄</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 8 }}>
              {search ? 'No matches found' : 'No summaries yet'}
            </h3>
            <p style={{ color: 'var(--light-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 20 }}>
              {search ? 'Try a different search term.' : 'Paste a URL or text above to create your first summary.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
            {filtered.map(s => (
              <div
                key={s.id}
                className="card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transform: 'none',
                  cursor: 'pointer',
                  padding: '16px 20px',
                }}
                onClick={() => navigate(`/summary/${s.id}`)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--brand-primary-100), var(--brand-secondary-100))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    📋
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 'var(--text-base)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
                      {new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {s.source_url && ' · ' + new URL(s.source_url).hostname}
                    </p>
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--light-text-dim)', flexShrink: 0 }}>
                  <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}