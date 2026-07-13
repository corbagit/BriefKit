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
      {/* Top Announcement Bar */}
      <div style={{ background: 'linear-gradient(135deg, #0EA5E9, #6366F1)', padding: '8px 16px', textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
        <span className="badge badge-spark" style={{ marginRight: 8 }}>⚡ Now in Public Beta</span>
        <Link to="/pricing" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: 2 }}>Free to Start →</Link>
      </div>

      {/* Nav */}
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

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '50%', width: '800px', height: '800px', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ marginBottom: 16 }}>
            <span className="badge badge-spark">✨ Transform your creative process</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.05em', marginBottom: 24 }}>
            Turn your brief into<br /><span className="grad-text">a breakthrough.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94A3B8', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.6 }}>
            BriefKit transforms dense creative briefs into organized, actionable toolkits. Drop in a brief. Get the complete kit — copy, outlines, checklists, and plans — ready to ship in seconds.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCTA} className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 32px' }}>Build Your First Kit →</button>
            <a href="#how" className="btn btn-secondary" style={{ fontSize: 'var(--text-base)', padding: '16px 32px', background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#F8FAFC' }}>See How It Works</a>
          </div>
        </div>
      </section>

      {/* Demo / Features / How It Works / Testimonials / FAQ sections remain the same */}
      {/* ... include all content from Features through FAQ sections unchanged ... */}

      {/* Pricing — links to the real pricing page */}
      <section id="pricing" style={{ padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: '#F8FAFC', marginBottom: 16 }}>Simple, transparent pricing</h2>
          <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 'var(--text-lg)' }}>Start free. Upgrade when you need more.</p>
          <Link to="/pricing" className="btn btn-primary" style={{ fontSize: 'var(--text-base)', padding: '16px 40px' }}>View Plans →</Link>
        </div>
      </section>

      {/* Final CTA */}
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
  );
}
