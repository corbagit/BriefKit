import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { summariesApi, billingApi } from '../services/api';
import Footer from '../components/Footer';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [usage, setUsage] = useState<{ tier: string; used: number; limit: number; remaining: number } | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      summariesApi.usage(),
      billingApi.getSubscription(),
      billingApi.getPlans(),
    ])
      .then(([usageData, subData, plansData]) => {
        setUsage(usageData);
        setSubscription(subData);
        setPlans(plansData.plans);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--light-border)',
            borderTopColor: 'var(--brand-primary)', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
          }} />
          <p style={{ color: 'var(--light-text-muted)' }}>Loading admin…</p>
        </div>
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
              color: '#94A3B8', fontSize: 'var(--text-sm)',
              background: 'none', border: 'none', cursor: 'pointer',
              marginBottom: 16, fontFamily: 'var(--font-sans)',
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)',
            fontWeight: 700, color: '#F8FAFC',
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>
            Account overview and subscription management
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 700 }}>
        {/* Account Overview */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
            fontWeight: 600, marginBottom: 20,
          }}>
            Account Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ padding: '16px', background: 'var(--light-bg-input)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Plan</p>
              <p style={{ fontWeight: 700, textTransform: 'capitalize' }}>{user?.subscription_tier || 'free'}</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--light-bg-input)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Status</p>
              <p style={{ fontWeight: 700, textTransform: 'capitalize' }}>{subscription?.status || 'inactive'}</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--light-bg-input)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Summaries Used</p>
              <p style={{ fontWeight: 700 }}>{usage?.used || 0} / {usage?.limit || 5}</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--light-bg-input)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Remaining</p>
              <p style={{ fontWeight: 700 }}>{usage?.remaining || 0}</p>
            </div>
          </div>
        </div>

        {/* Usage Chart */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
            fontWeight: 600, marginBottom: 20,
          }}>
            Usage Overview
          </h2>
          {usage && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>Monthly summaries</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{usage.used}/{usage.limit} ({Math.round((usage.used / usage.limit) * 100)}%)</span>
              </div>
              <div style={{ height: 12, background: 'var(--light-bg-input)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min((usage.used / usage.limit) * 100, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, var(--brand-primary), ${usage.remaining < 5 ? 'var(--color-danger)' : 'var(--brand-secondary)'})`,
                  borderRadius: 99,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)' }}>0</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)' }}>{usage.limit}</span>
              </div>
            </div>
          )}
        </div>

        {/* Plans Reference */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
            fontWeight: 600, marginBottom: 20,
          }}>
            Available Plans
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {plans.map(plan => (
              <div key={plan.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: plan.id === user?.subscription_tier ? 'var(--brand-primary-light)' : 'var(--light-bg-input)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div>
                  <p style={{ fontWeight: 600, textTransform: 'capitalize' }}>{plan.name}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
                    {plan.summariesPerMonth === 99999 ? 'Unlimited' : plan.summariesPerMonth} summaries/month
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700 }}>${plan.price}/mo</p>
                  {plan.id === user?.subscription_tier && (
                    <span className="badge badge-primary" style={{ fontSize: 'var(--text-xs)' }}>Current</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ transform: 'none' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
            fontWeight: 600, marginBottom: 20,
          }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/settings')} className="btn btn-primary" style={{ padding: '10px 24px' }}>
              Manage Subscription
            </button>
            <button onClick={() => navigate('/pricing')} className="btn btn-secondary" style={{ padding: '10px 24px' }}>
              View Plans
            </button>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '10px 24px' }}>
              Dashboard
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}