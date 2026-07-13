import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../services/api';

export interface User {
  id: string;
  email: string;
  name: string;
  subscription_tier: 'free' | 'pro' | 'unlimited';
  subscription_status: string;
  summaries_count: number;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('briefkit_token');
    const savedUser = localStorage.getItem('briefkit_user');
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Verify token is still valid by fetching profile
        authApi.getProfile().then(res => {
          setUser(res.user);
          localStorage.setItem('briefkit_user', JSON.stringify(res.user));
        }).catch(() => {
          // Token expired — clear
          localStorage.removeItem('briefkit_token');
          localStorage.removeItem('briefkit_user');
          setUser(null);
          setToken(null);
        });
      } catch {
        localStorage.removeItem('briefkit_token');
        localStorage.removeItem('briefkit_user');
      }
    }
    setLoading(false);
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('briefkit_token', data.token);
    localStorage.setItem('briefkit_user', JSON.stringify(data.user));
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await authApi.signup(name, email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('briefkit_token', data.token);
    localStorage.setItem('briefkit_user', JSON.stringify(data.user));
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('briefkit_token');
    localStorage.removeItem('briefkit_user');
  };

  const refreshUser = async () => {
    try {
      const data = await authApi.getProfile();
      setUser(data.user);
      localStorage.setItem('briefkit_user', JSON.stringify(data.user));
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signin, signup, signout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}