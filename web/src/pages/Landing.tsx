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
    { accent: '#0EA5E9', title: 'Drop in any format', desc: 'Paste plain text, messy bullet points, or a full PDF brief. Our parser strips away the noise and structures your ideas for immediate action.', icon: '📄' },
    { accent: '#6366F1', title: 'A complete toolkit, assembled', desc: 'From a single brief, BriefKit builds a synchronized set of outputs: marketing copy, structural outlines, technical checklists, and timelines.', icon: '🧩' },
    { accent: '#A855F7', title: 'Edit once. Update everything.', desc: 'Refine your original brief at any time. BriefKit automatically re-assembles and updates every tool in your kit.', icon: '🔄' },
    { accent: '#0EA5E9', title: 'Ship to your stack', desc: 'Send your completed kit to Notion, Slack, or download offline-ready PDFs with a single click.', icon: '🚀' },
    { accent: '#6366F1', title: 'One source of truth', desc: 'Keep designers, copywriters, and developers aligned on the exact same goals. Comment, edit, and approve in real time.', icon: '👥' },
    { accent: '#F59E0B', title: 'Zero friction, infinite speed', desc: 'Brief to breakthrough in under five seconds. No tedious wizards or multi-step forms. Instant clarity the moment you hit submit.', icon: '⚡' },
  ];

  const steps = [
    { num: '01', title: 'Write Your Brief', desc: 'Jot down your project scope, goals, and target audience. Paste an existing email or rough notes. BriefKit handles the formatting.' },
    { num: '02', title: 'Watch the Kit Assemble', desc: 'Our engine analyzes your input and instantly generates precise templates, checklists, and timelines tailored to your brief.' },
    { num: '03', title: 'Ship Your Breakthrough', desc: 'Export to your favorite tools, assign checklists, and start executing with confidence. Reclaim hours of manual work.' },
  ];

  const testimonials = [
    { quote: 'Before BriefKit, our agency spent hours translating client briefs. Now, we drop the email in and have an entire team workspace ready in seconds. It cut our onboarding prep time by 80%.', name: 'Marcus T.', role: 'Founder, Vanguard Digital' },
    { quote: 'Translating product strategy into launch assets is a constant game of telephone. BriefKit acts as our single source of truth — when specs change, everything syncs automatically.', name: 'Sonia K.', role: 'PMM, OrbitSaaS' },
    { quote: 'As a solo operator, BriefKit is like having a staff strategist, copywriter, and project manager in my pocket. Client call to comprehensive project plan in five minutes.', name: 'James L.', role: 'Growth Consultant' },
  ];

  const faqs = [
    { q: 'What formats of briefs do you support?', a: 'You can paste plain text, bullet points, raw conversation transcripts, or upload complete PDF files. Our parser extracts meaning from both structured briefs and messy brain dumps.' },
    { q: 'Does the AI write actual deliverables or just organize them?', a: 'Both. BriefKit structures timelines and checklists, and also generates drafts of copy, email templates, and social posts based on the messaging strategy in your brief.' },
    { q: 'How does Smart Iteration work?', a: 'When you modify any part of your input brief, our engine re-evaluates the entire kit — updating checklists, adapting copy, and shifting timelines so your assets never become outdated.' },
    { q: 'Can we export to tools we already use?', a: 'Yes. We currently support exports to Notion (with custom dashboard templates), Markdown, Slack channels, and PDF formats. We are continuously adding new integrations.' },
    { q: 'Is my client data secure?', a: 'Absolutely. Your briefs, plans, and files are encrypted both in transit and at rest. We never use your proprietary client data to train public models.' },
  ];

  const handleCTA = () => {
    if (user) { navigate('/dashboard'); }
    else { navigate('/register'); }
  };

  const tabContent: Record<string, string> = {
    'Strategy': `## Core Positioning\n\n**Your Idea** — reimagined for your audience.\n\n### Key Insights\n- Your audience values clarity over complexity\n- Meet them where they are\n- Consistency builds trust\n\n### Action Steps\n1. Define your north star metric\n2. Align messaging across channels\n3. Ship and iterate`,
    'Content': `## Generated Content\n\n### Social Post\n💡 **Big Idea**\n\nThe simplest way to make an impact?\n\n1. Start with one clear message\n2. Remove everything that doesn't serve it\n3. Ship with confidence\n\n### Email Draft\n**Subject:** Your breakthrough starts here\n\nEverything is aligned — from strategy to execution. Let's ship it.`,
    'Checklist': `## Launch Checklist\n\n- [ ] Finalize core message\n- [ ] Create platform-specific assets\n- [ ] Review and approve content drafts\n- [ ] Schedule publication timeline\n- [ ] Monitor engagement and iterate`,
    'Export': `## Export Options\n\n• **Notion** — Structured workspace\n• **Markdown** — Portable file\n• **Slack** — Push to team\n• **PDF** — Offline-ready document`,
  };

  return (
    <div style={{ background: '#0F172A', color: '#F8FAFC' }}>
      <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)', padding: '8px 16px', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
        <span style={{ marginRight: 8 }}>⚡ Now in Public Beta</span>
        <Link to="/pricing" style={{ color: 'white', textDecoration: 'underline' }}>Free to Start →</Link>
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/brand/logo-icon.svg" alt="" width="32" height="32" />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)' }}>BriefKit</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#features" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8' }}>Features</a>
            <a href="#how" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8' }}>How It Works</a>
            <Link to="/pricing" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8' }}>Pricing</Link>
            <Link to="/login" style={{ fontSize: 'var(--text-sm)', color: '#94A3B8', padding: '8px 16px' }}>Sign In</Link>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: 'var(--text-sm)', padding: '8px 20px' }}>Start Free</Link>
          </div>
        </div>
      </nav>

      <section style={{ padding: '120px 0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', width: '800px', height: '800px', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'rgba(14,165,233,0.15)', color: '#0EA5E9', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: 16 }}>✨ Transform your creative process</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.05em', marginBottom: 24 }}>
            Turn your brief into<br /><span className="grad-text">a breakthrough.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94A3B8', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
            BriefKit transforms dense creative briefs into organized, actionable toolkits.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCTA} className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 32px' }}>Build Your First Kit →</button>
            <a href="#how" className="btn btn-secondary" style={{ fontSize: 'var(--text-base)', padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#F8FAFC' }}>See How It Works</a>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '100px 0' }}>
        <div className="container">
          <p style={{ color: '#0EA5E9', fontSize: 'var(--text-sm)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Features</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>Everything you need, nothing you don't.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: '24px', borderRadius: 'var(--radius-xl)', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 0.5)', borderLeft: `3px solid ${f.accent}` }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: '100px 0', background: '#0B1121' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <p style={{ color: '#6366F1', fontSize: 'var(--text-sm)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, textAlign: 'center' }}>Process</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 48, textAlign: 'center' }}>3 steps. 1 breakthrough.</h2>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', fontWeight: 800, background: 'linear-gradient(135deg, #0EA5E9, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, minWidth: 80 }}>{step.num}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 600, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Trusted by teams who ship</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ padding: '24px', borderRadius: 'var(--radius-xl)', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <p style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{t.name}</p>
                  <p style={{ color: '#64748B', fontSize: 'var(--text-xs)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#0B1121' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.5)', padding: '20px 0' }}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#F8FAFC', fontSize: 'var(--text-base)', fontWeight: 500, textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>
                {faq.q}
                <span style={{ transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s', fontSize: 'var(--text-xl)', color: '#64748B' }}>+</span>
              </button>
              {faqOpen === i && <p style={{ color: '#94A3B8', lineHeight: 1.7, paddingTop: 12, fontSize: 'var(--text-sm)' }}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" style={{ padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>Simple, transparent pricing</h2>
          <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 'var(--text-lg)' }}>Start free. Upgrade when you need more.</p>
          <Link to="/pricing" className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 40px' }}>View Plans →</Link>
        </div>
      </section>

      <section style={{ padding: '100px 0 120px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Ready to turn your next brief<br /><span className="grad-text">into a breakthrough?</span>
          </h2>
          <button onClick={handleCTA} className="btn btn-primary" style={{ fontSize: 'var(--text-lg)', padding: '16px 40px' }}>Start Free Today →</button>
          <p style={{ color: '#64748B', fontSize: 'var(--text-sm)', marginTop: 16 }}>No credit card required. Includes 3 free kits per month.</p>
        </div>
      </section>
    </div>
  );
}
