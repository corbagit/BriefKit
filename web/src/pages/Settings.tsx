import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi, billingApi, summariesApi } from '../services/api';
import Footer from '../components/Footer';

interface UsageInfo {
  tier: string;
  used: number;
  limit: number;
  remaining: number;
}

interface SubscriptionInfo {
  subscription: any | null;
  plan: { name: string; price: number; summariesPerMonth: number } | null;
  status: string;
}

export default function Settings() {
  const { user, signout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    Promise.all([
      summariesApi.usage(),
      billingApi.getSubscription(),
    ])
      .then(([usageData, subData]) => {
        setUsage(usageData);
        setSubscription(subData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setSaveMsg('');
    try {
      await authApi.updateProfile(name.trim());
      await refreshUser();
      setSaveMsg('Profile updated!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = async (tier: string) => {
    setUpgrading(true);
    try {
      const data = await billingApi.createCheckout(tier);
      if (data.url) {
        window.location.href = data.url;
      } else if (data.success) {
        // Mock mode — refresh
        await refreshUser();
        const [usageData, subData] = await Promise.all([
          summariesApi.usage(),
          billingApi.getSubscription(),
        ]);
        setUsage(usageData);
        setSubscription(subData);
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Upgrade failed');
    } finally {
      setUpgrading(false);
    }
  };

  const handleSignout = () => {
    signout();
    navigate('/');
  };

  const usagePercent = usage ? Math.round((usage.used / usage.limit) * 100) : 0;

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
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: '#F8FAFC',
          }}>
            Settings
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 24, paddingBottom: 48, maxWidth: 600 }}>
        {/* Profile Section */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            marginBottom: 20,
          }}>
            Profile
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 6 }}>
                Name
              </label>
              <input
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 6 }}>
                Email
              </label>
              <input
                className="input"
                value={user?.email || ''}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--light-text-dim)', marginTop: 4 }}>
                Email cannot be changed.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={handleSaveProfile}
                className="btn btn-primary"
                disabled={saving || !name.trim() || name === user?.name}
                style={{ padding: '10px 24px' }}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              {saveMsg && (
                <span style={{
                  fontSize: 'var(--text-sm)',
                  color: saveMsg.includes('updated') ? 'var(--color-success)' : 'var(--color-danger)',
                }}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            marginBottom: 20,
          }}>
            Subscription
          </h2>

          {loading ? (
            <p style={{ color: 'var(--light-text-muted)' }}>Loading subscription…</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Current Plan */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'var(--brand-primary-light)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div>
                  <p style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {user?.subscription_tier || 'Free'} Plan
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
                    {subscription?.status === 'active' ? 'Active' : 'No active subscription'}
                    {subscription?.plan && ` — ${subscription.plan.name} ($${subscription.plan.price}/mo, ${subscription.plan.summariesPerMonth} summaries/mo)`}
                  </p>
                </div>
                <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                  {user?.subscription_tier || 'free'}
                </span>
              </div>

              {/* Usage bar */}
              {usage && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>Monthly usage</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{usage.used}/{usage.limit}</span>
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
                      You've hit your monthly limit. Upgrade to continue.
                    </p>
                  )}
                </div>
              )}

              {/* Upgrade options */}
              {user?.subscription_tier === 'free' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Available Plans</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['pro', 'unlimited'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => handleUpgrade(tier)}
                        disabled={upgrading}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '10px 16px', textTransform: 'capitalize' }}
                      >
                        {upgrading ? 'Processing…' : `Upgrade to ${tier} — $${tier === 'pro' ? 9 : 19}/mo`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(user?.subscription_tier !== 'free' && user?.subscription_tier) && (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => handleUpgrade('unlimited')}
                    disabled={upgrading}
                    className="btn btn-primary"
                    style={{ padding: '10px 24px' }}
                  >
                    {upgrading ? 'Processing…' : 'Upgrade to Unlimited'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="card" style={{ transform: 'none', marginBottom: 24 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            marginBottom: 20,
          }}>
            Account
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
              Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
            </p>
            <button
              onClick={handleSignout}
              className="btn btn-secondary"
              style={{ padding: '10px 24px', color: 'var(--color-danger)', borderColor: 'var(--color-danger-light)' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}