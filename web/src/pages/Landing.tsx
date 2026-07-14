import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Strategy');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const features = [
    {
      accent: '#0EA5E9',
      title: 'Drop in any format',
      desc: 'Paste plain text, messy bullet points, or a full PDF brief. Our parser strips away the noise and structures your ideas for immediate action.',
      icon: '📄',
    },
    {
      accent: '#6366F1',
      title: 'A complete toolkit, assembled',
      desc: 'From a single brief, BriefKit builds a synchronized set of outputs: marketing copy, structural outlines, technical checklists, and timelines.',
      icon: '🧩',
    },
    {
      accent: '#A855F7',
      title: 'Edit once. Update everything.',
      desc: 'Refine your original brief at any time. BriefKit automatically re-assembles and updates every tool in your kit.',
      icon: '🔄',
    },
    {
      accent: '#0EA5E9',
      title: 'Ship to your stack',
      desc: 'Send your completed kit to Notion, Slack, or download offline-ready PDFs with a single click.',
      icon: '🚀',
    },
    {
      accent: '#6366F1',
      title: 'One source of truth',
      desc: 'Keep designers, copywriters, and developers aligned on the exact same goals. Comment, edit, and approve in real time.',
      icon: '👥',
    },
    {
      accent: '#F59E0B',
      title: 'Zero friction, infinite speed',
      desc: 'Brief to breakthrough in under five seconds. No tedious wizards or multi-step forms. Instant clarity the moment you hit submit.',
      icon: '⚡',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Write Your Brief',
      desc: 'Jot down your project scope, goals, and target audience. Paste an existing email or rough notes. BriefKit handles the formatting.',
    },
    {
      num: '02',
      title: 'Watch the Kit Assemble',
      desc: 'Our engine analyzes your input and instantly generates precise templates, checklists, and timelines tailored to your brief.',
    },
    {
      num: '03',
      title: 'Ship Your Breakthrough',
      desc: 'Export to your favorite tools, assign checklists, and start executing with confidence. Reclaim hours of manual work.',
    },
  ];

  const testimonials = [
    {
      quote: 'Before BriefKit, our agency spent hours translating client briefs. Now, we drop the email in and have an entire team workspace ready in seconds. It cut our onboarding prep time by 80%.',
      name: 'Marcus T.',
      role: 'Founder, Vanguard Digital',
    },
    {
      quote: 'Translating product strategy into launch assets is a constant game of telephone. BriefKit acts as our single source of truth — when specs change, everything syncs automatically.',
      name: 'Sonia K.',
      role: 'PMM, OrbitSaaS',
    },
    {
      quote: 'As a solo operator, BriefKit is like having a staff strategist, copywriter, and project manager in my pocket. Client call to comprehensive project plan in five minutes.',
      name: 'James L.',
      role: 'Growth Consultant',
    },
  ];

  const faqs = [
    {
      q: 'What formats of briefs do you support?',
      a: 'You can paste plain text, bullet points, raw conversation transcripts, or upload complete PDF files. Our parser extracts meaning from both structured briefs and messy brain dumps.',
    },
    {
      q: 'Does the AI write actual deliverables or just organize them?',
      a: 'Both. BriefKit structures timelines and checklists, and also generates drafts of copy, email templates, and social posts based on the messaging strategy in your brief.',
    },
    {
      q: 'How does Smart Iteration work?',
      a: 'When you modify any part of your input brief, our engine re-evaluates the entire kit — updating checklists, adapting copy, and shifting timelines so your assets never become outdated.',
    },
    {
      q: 'Can we export to tools we already use?',
      a: 'Yes. We currently support exports to Notion (with custom dashboard templates), Markdown, Slack channels, and PDF formats. We are continuously adding new integrations.',
    },
    {
      q: 'Is my client data secure?',
      a: 'Absolutely. Your briefs, plans, and files are encrypted both in transit and at rest. We never use your proprietary client data to train public models.',
    },
  ];

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const tabContent: Record<string, string> = {
    'Strategy': `## Core Positioning\n\n**Your Idea** — reimagined for your audience.\n\n### Key Insights\n- Your audience values clarity over complexity\n- Meet them where they are\n- Consistency builds trust\n\n### Action Steps\n1. Define your north star metric\n2. Align messaging across channels\n3. Ship and iterate`,
    'Content': `## Generated Content\n\n### Social Post\n💡 **Big Idea**\n\nThe simplest way to make an impact?\n\n1. Start with one clear message\n2. Remove everything that doesn't serve it\n3. Ship with confidence\n\n### Email Draft\n**Subject:** Your breakthrough starts here\n\nEverything is aligned — from strategy to execution. Let's ship it.`,
    'Checklist': `## Launch Checklist\n\n- [ ] Finalize core message\n- [ ] Create platform-specific assets\n- [ ] Review and approve content drafts\n- [ ] Schedule publication timeline\n- [ ] Monitor engagement and iterate`,
    'Export': `## Export Options\n\n• **Notion** — Structured workspace\n• **Markdown** — Portable file\n• **Slack** — Push to team\n• **PDF** — Offline-ready document`,
  };

  return (
    <div style={{ background: '#0F172A', color: '#F8FAFC' }}>
      </div>
 )
  };
      {/* Top Announcement Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
        padding: '8px 16px',
        textAlign: 'center',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
      }}>
        <span className="badge badge-spark" style={{ marginRight: 8 }}>⚡ Now in Public Beta</span>
        <Link to="/pricing" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: 2 }}>
  Free to Start →
</Link>
      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/brand/logo-icon.svg" alt="" width="32" height="32" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>BriefKit</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#features" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', transition: 'color 0.2s' }}>Features</a>
            <a href="#how" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', transition: 'color 0.2s' }}>How It Works</a>
            <a href="#pricing" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', transition: 'color 0.2s' }}>Pricing</a>
            <Link to="/login" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', padding: '8px 16px' }}>Sign In</Link>
            <Link to="/pricing" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', transition: 'color 0.2s' }}>Pricing</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: '120px 0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          width: '800px',
          height: '800px',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 16 }}>
            <span className="badge badge-spark" style={{ fontSize: 'var(--text-xs)' }}>✨ Transform your creative process</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.05em',
            marginBottom: 24,
          }}>
            Turn your brief into<br />
            <span className="grad-text">a breakthrough.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94A3B8',
            maxWidth: 640,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            BriefKit transforms dense creative briefs into organized, actionable toolkits. Drop in a brief. Get the complete kit — copy, outlines, checklists, and plans — ready to ship in seconds.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCTA} className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 32px' }}>
              Build Your First Kit →
            </button>
            <a href="#how" className="btn btn-secondary" style={{
              fontSize: 'var(--text-base)',
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.2)',
              color: '#F8FAFC',
            }}>
              See How It Works
            </a>
          </div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: 32, fontSize: 'var(--text-sm)', color: '#64748B' }}>
            <span>✓ No credit card required</span>
            <span>✓ Set up in under 2 minutes</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── Demo / Interactive Preview ─────────────────────────── */}
      <section id="demo" style={{ padding: '80px 0', background: '#0B1121' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="section-subtitle" style={{ color: '#0EA5E9' }}>Product Demo</p>
            <h2 className="section-title" style={{ color: '#F8FAFC' }}>Watch a brief become a kit</h2>
            <p style={{ color: '#94A3B8', maxWidth: 560, margin: '16px auto 0' }}>
              Paste your raw thoughts on the left. Watch BriefKit instantly parse, structure, and assemble your custom toolkit on the right.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            maxWidth: 960,
            margin: '0 auto',
          }}>
            {/* Input Panel */}
            <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid #334155',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: '#94A3B8',
                fontFamily: 'var(--font-display)',
              }}>
                📝 Your Brief
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', lineHeight: 1.7, fontStyle: 'italic' }}>
                  "Launch campaign for a new premium organic coffee brand, 'Aura Brew'. We need to establish them as a high-end daily ritual for remote professionals. Need a 5-day launch strategy, email sequences for welcoming new signups, and a social media content checklist."
                </p>
              </div>
            </div>

            {/* Output Panel with Tabs */}
            <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #334155',
              }}>
                {['Strategy', 'Content', 'Checklist', 'Export'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-display)',
                      background: activeTab === tab ? 'rgba(14,165,233,0.15)' : 'transparent',
                      color: activeTab === tab ? '#0EA5E9' : '#64748B',
                      border: 'none',
                      borderBottom: activeTab === tab ? '2px solid #0EA5E9' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div style={{ padding: 16 }}>
                <pre style={{
                  fontSize: 'var(--text-sm)',
                  color: '#CBD5E1',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-sans)',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}>
                  {tabContent[activeTab]}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-subtitle" style={{ color: '#0EA5E9' }}>Features</p>
            <h2 className="section-title" style={{ color: '#F8FAFC' }}>Everything you need, nothing you don't.</h2>
            <p style={{ color: '#94A3B8', maxWidth: 640, margin: '16px auto 0' }}>
              BriefKit doesn't just generate text — it designs a cohesive system. Every tool in your kit is born from the same brief, so strategy and execution stay perfectly aligned.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {features.map((f, i) => (
              <div key={i} className="card-dark animate-in" style={{
                animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                borderLeft: `3px solid ${f.accent}`,
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  marginBottom: 8,
                }}>{f.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section id="how" style={{ padding: '100px 0', background: '#0B1121' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-subtitle" style={{ color: '#6366F1' }}>Process</p>
            <h2 className="section-title" style={{ color: '#F8FAFC' }}>3 steps. 1 breakthrough.</h2>
            <p style={{ color: '#94A3B8', marginTop: 16 }}>How we bridge the gap between planning and shipping.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-5xl)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  minWidth: 80,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    marginBottom: 8,
                  }}>{step.title}</h3>
                  <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title" style={{ color: '#F8FAFC' }}>Trusted by teams who ship</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0EA5E9" opacity="0.4">
                  <path d="M10 11H6.5C5.67 11 5 10.33 5 9.5V7C5 5.9 5.9 5 7 5h3c1.1 0 2 .9 2 2v5c0 4-2 7-6 8v-2c2.5-.8 4-2.5 4-5zm10 0h-3.5c-.83 0-1.5-.67-1.5-1.5V7c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v5c0 4-2 7-6 8v-2c2.5-.8 4-2.5 4-5z"/>
                </svg>
                <p style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: 'var(--text-sm)' }}>"{t.quote}"</p>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t.name}</p>
                  <p style={{ color: '#64748B', fontSize: 'var(--text-xs)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0B1121' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 className="section-title" style={{ color: '#F8FAFC', textAlign: 'center', marginBottom: 48 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
              }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    color: '#F8FAFC',
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {faq.q}
                  <span style={{
                    transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    fontSize: 'var(--text-xl)',
                    color: '#64748B',
                  }}>+</span>
                </button>
                {faqOpen === i && (
                  <p style={{
                    color: '#94A3B8',
                    lineHeight: 1.7,
                    paddingBottom: 20,
                    fontSize: 'var(--text-sm)',
                    animation: 'fadeInUp 0.3s ease-out',
                  }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
     <section id="pricing" style={{ padding: '100px 0' }}>
  <div className="container" style={{ textAlign: 'center' }}>
    <h2 className="section-title" style={{ color: '#F8FAFC', marginBottom: 16 }}>Simple, transparent pricing</h2>
    <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 'var(--text-lg)' }}>
      Start free. Upgrade when you need more.
    </p>
    <Link to="/pricing" className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 40px' }}>
      View Plans →
    </Link>
  </div>
</section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {/* Free */}
            <div className="card-dark" style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 8 }}>Free</h3>
              <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', marginBottom: 24 }}>For trying it out</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 800 }}>$0</span>
                <span style={{ color: '#64748B' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ 3 kits per month</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Basic content generation</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Markdown export</li>
              </ul>
              <button onClick={handleCTA} className="btn btn-dark" style={{ width: '100%' }}>Get Started</button>
            </div>

            {/* Starter */}
            <div className="card-dark" style={{
              textAlign: 'center',
              borderColor: '#0EA5E9',
              position: 'relative',
              transform: 'scale(1.05)',
            }}>
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
              }}>
                Most Popular
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 8, marginTop: 8 }}>Starter</h3>
              <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', marginBottom: 24 }}>For growing teams</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 800 }}>$29</span>
                <span style={{ color: '#64748B' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ 10 kits per month</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Smart iteration</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Notion + Slack export</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Priority support</li>
              </ul>
              <button onClick={handleCTA} className="btn btn-primary" style={{ width: '100%' }}>Start Free Trial</button>
            </div>

            {/* Pro */}
            <div className="card-dark" style={{ textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 8 }}>Pro</h3>
              <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', marginBottom: 24 }}>For power users</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 'var(--text-5xl)', fontWeight: 800 }}>$59</span>
                <span style={{ color: '#64748B' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Unlimited kits</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Team collaboration</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ All export formats</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ API access</li>
                <li style={{ display: 'flex', gap: 8, fontSize: 'var(--text-sm)', color: '#CBD5E1' }}>✓ Dedicated support</li>
              </ul>
              <button onClick={handleCTA} className="btn btn-dark" style={{ width: '100%' }}>Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '100px 0 120px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Ready to turn your next brief<br />
            <span className="grad-text">into a breakthrough?</span>
          </h2>
          <p style={{ color: '#94A3B8', maxWidth: 500, margin: '0 auto 32px', fontSize: 'var(--text-lg)' }}>
            Join thousands of marketers, product managers, and creators who ship faster with BriefKit.
          </p>
          <button onClick={handleCTA} className="btn btn-primary" style={{ fontSize: 'var(--text-lg)', padding: '16px 40px' }}>
            Start Free Today →
          </button>
          <p style={{ color: '#64748B', fontSize: 'var(--text-sm)', marginTop: 16 }}>No credit card required. Includes 3 free kits per month.</p>
        </div>
      </section>
    </div>
  );
}
