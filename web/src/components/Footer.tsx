import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--light-border)',
      padding: '48px 0 32px',
      marginTop: '64px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <img src="/brand/logo-icon.svg" alt="" width="28" height="28" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                BriefKit
              </span>
            </div>
            <p style={{ color: 'var(--light-text-muted)', fontSize: 'var(--text-sm)', maxWidth: 260 }}>
              Turn your brief into a breakthrough. The smart toolkit that bridges strategy and execution.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--light-text-muted)' }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>Features</Link>
              <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-muted)' }}>Pricing</Link>
              <Link to="/register" style={{ fontSize: 'var(--text-sm)', color: 'var(--brand-primary)', fontWeight: 500 }}>Get Started</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--light-text-muted)' }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-dim)' }}>About</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-dim)' }}>Blog</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-dim)' }}>Contact</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--light-text-muted)' }}>
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-dim)' }}>Privacy</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--light-text-dim)' }}>Terms</span>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--light-border)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: 'var(--text-sm)',
          color: 'var(--light-text-dim)',
        }}>
          &copy; {new Date().getFullYear()} BriefKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}