import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  const handleSignout = () => {
    signout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: isLanding ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${isLanding ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)'}`,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/brand/logo-icon.svg" alt="BriefKit" width="32" height="32" style={{ flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'var(--text-xl)',
            color: isLanding ? '#F8FAFC' : 'var(--light-text-main)',
          }}>
            BriefKit
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost" style={{
                color: isLanding ? '#94A3B8' : undefined,
                padding: '8px 16px',
              }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>
                Start Free
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-ghost" style={{
                color: isLanding ? '#94A3B8' : undefined,
                padding: '8px 16px',
              }}>
                Dashboard
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: isLanding ? '#94A3B8' : 'var(--light-text-muted)' }}>
                  {user.name}
                </span>
                <button onClick={handleSignout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}