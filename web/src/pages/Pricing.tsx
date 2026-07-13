import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { billingApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Plan {
  id: string;
  name: string;
  price: number;
  summariesPerMonth: number;
  description: string;
}

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<string | null>(null);

  useEffect(() => {
    billingApi.getPlans()
      .then(data => setPlans(data.plans))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (tier: string) => {
    if (!user) {
      navigate('/register');
      return;
    }
    setUpgrading(tier);
    try {
      const data = await billingApi.createCheckout(tier);
      if (data.url) {
        window.location.href = data.url;
      } else if (data.success) {
        navigate('/settings');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Upgrade failed');
    } finally {
      setUpgrading(null);
    }
  };

  const planFeatures: Record<string, string[]> = {
    free: ['5 summaries/month', 'Basic summary generation', 'Key takeaways', 'Email support'],
    pro: ['50 summaries/month', 'Advanced summary generation', 'Key takeaways & insights', 'Priority support', 'Markdown export'],
    unlimited: ['Unlimited summaries', 'Advanced summary generation', 'Key takeaways & insights', 'Priority support', 'Markdown export', 'API access', 'Team collaboration'],
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-bg)' }}>
      <Navbar />

      <div style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <p className="section-subtitle" style={{ color: 'var(--brand-primary)' }}>Pricing</p>
          <h1 className="section-title" style={{ marginBottom: 16 }}>
            Simple, transparent pricing
          </h1>
          <p style={{ color: 'var(--light-text-muted)', maxWidth: 500, margin: '0 auto 48px', fontSize: 'var(--text-lg)' }}>
            Start free. Upgrade when you need more.
          </p>

          {loading ? (
            <p style={{ color: 'var(--light-text-muted)' }}>Loading plans…</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              maxWidth: 960,
              margin: '0 auto',
            }}>
              {plans.map((plan, i) => {
                const isPopular = plan.id === 'pro';
                const isCurrent = user?.subscription_tier === plan.id;
                const features = planFeatures[plan.id] || [];

                return (
                  <div
                    key={plan.id}
                    className="card"
                    style={{
                      textAlign: 'center',
                      transform: 'none',
                      position: 'relative',
                      ...(isPopular ? { borderColor: 'var(--brand-primary)', boxShadow: 'var(--shadow-lg)' } : {}),
                    }}
                  >
                    {isPopular && (
                      <div style={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                      }}>
                        Most Popular
                      </div>
                    )}

                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 700,
                      marginBottom: 8,
                      marginTop: isPopular ? 8 : 0,
                      textTransform: 'capitalize',
                    }}>
                      {plan.name}
                    </h3>
                    <p style={{ color: 'var(--light-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 24 }}>
                      {plan.description}
                    </p>

                    <div style={{ marginBottom: 24 }}>
                      <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 800 }}>
                        ${plan.price}
                      </span>
                      <span style={{ color: 'var(--light-text-muted)' }}>/mo</span>
                    </div>

                    <ul style={{
                      listStyle: 'none',
                      textAlign: 'left',
                      marginBottom: 32,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      padding: '0 16px',
                    }}>
                      <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--light-text-main)', fontWeight: 500 }}>
                        ✓ {plan.summariesPerMonth === 99999 ? 'Unlimited' : plan.summariesPerMonth} summaries/month
                      </li>
                      {features.map((f, fi) => (
                        <li key={fi} style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>
                          ✓ {f}
                        </li>
                      ))}
                    </ul>

                    {isCurrent ? (
                      <button
                        disabled
                        className="btn btn-secondary"
                        style={{ width: '100%', cursor: 'default', opacity: 0.7 }}
                      >
                        Current Plan
                      </button>
                    ) : plan.id === 'free' ? (
                      user ? (
                        <button
                          disabled
                          className="btn btn-secondary"
                          style={{ width: '100%', cursor: 'default', opacity: 0.7 }}
                        >
                          Already on Free
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/register')}
                          className="btn btn-primary"
                          style={{ width: '100%' }}
                        >
                          Get Started
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={upgrading === plan.id}
                        className={isPopular ? 'btn btn-primary' : 'btn btn-secondary'}
                        style={{ width: '100%' }}
                      >
                        {upgrading === plan.id ? 'Processing…' : user ? 'Upgrade' : 'Sign Up'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}