import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { summariesApi } from '../services/api';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

interface SummaryData {
  id: string;
  title: string;
  summary: string;
  source_url: string | null;
  source_text: string | null;
  key_takeaways: string[];
  actionable_insights: string[];
  created_at: string;
}

export default function Summary() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    summariesApi.get(id)
      .then(data => {
        setSummary(data.summary);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load summary');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--light-bg)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            border: '4px solid var(--light-border)',
            borderTopColor: 'var(--brand-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 24px',
          }} />
          <p style={{ color: 'var(--light-text-muted)' }}>Loading summary…</p>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
        <div className="container" style={{ paddingTop: 48, textAlign: 'center' }}>
          <p style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 600, marginBottom: 8 }}>
            Summary not found
          </h2>
          <p style={{ color: 'var(--light-text-muted)', marginBottom: 24 }}>{error || 'This summary does not exist or has been deleted.'}</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '32px 0',
      }}>
        <div className="container">
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              color: '#94A3B8',
              fontSize: 'var(--text-sm)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: 16,
              fontFamily: 'var(--font-sans)',
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: '#F8FAFC',
            marginBottom: 8,
          }}>
            {summary.title}
          </h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-primary">Summary</span>
            <span style={{ fontSize: 'var(--text-sm)', color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
              🕐 {new Date(summary.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            {summary.source_url && (
              <a
                href={summary.source_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 'var(--text-sm)', color: '#0EA5E9', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                🔗 Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ marginTop: 24, paddingBottom: 48 }}>
        <div style={{ maxWidth: 800 }}>
          {/* Summary Text */}
          <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              📝 Summary
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--light-text-main)' }}>{summary.summary}</p>
          </div>

          {/* Key Takeaways */}
          <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              💡 Key Takeaways
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20 }}>
              {summary.key_takeaways.map((item, i) => (
                <li key={i} style={{ lineHeight: 1.6, color: 'var(--light-text-main)' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Actionable Insights */}
          <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              ⚡ Actionable Insights
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 20 }}>
              {summary.actionable_insights.map((item, i) => (
                <li key={i} style={{ lineHeight: 1.6, color: 'var(--light-text-main)' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Source text preview */}
          {summary.source_text && (
            <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                📄 Original Text
              </h2>
              <p style={{ lineHeight: 1.7, color: 'var(--light-text-muted)', fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>
                {summary.source_text}
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
              ← Back to Dashboard
            </button>
            <button
              onClick={() => {
                const text = [
                  `# ${summary.title}`,
                  '',
                  '## Summary',
                  summary.summary,
                  '',
                  '## Key Takeaways',
                  ...summary.key_takeaways.map(t => `- ${t}`),
                  '',
                  '## Actionable Insights',
                  ...summary.actionable_insights.map(i => `- ${i}`),
                ].join('\n');
                navigator.clipboard.writeText(text);
              }}
              className="btn btn-primary"
            >
              📋 Copy as Markdown
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}