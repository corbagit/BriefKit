import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import api from '../services/api'

export interface User {
  id: string; email: string; name: string; subscription_tier: string; subscription_status: string; summaries_count: number
}

interface AuthCtx { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<{ok: boolean; error?: string}>; register: (name: string, email: string, password: string) => Promise<{ok: boolean; error?: string}>; logout: () => void; refresh: () => Promise<void> }

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => { const s = localStorage.getItem('bk_user'); return s ? JSON.parse(s) : null })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('bk_token')) {
      setLoading(true)
      api.get('/auth/me').then(r => { setUser(r.data.user); localStorage.setItem('bk_user', JSON.stringify(r.data.user)) }).catch(() => { localStorage.removeItem('bk_token'); localStorage.removeItem('bk_user'); setUser(null) }).finally(() => setLoading(false))
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try { const r = await api.post('/auth/login', { email, password }); localStorage.setItem('bk_token', r.data.token); localStorage.setItem('bk_user', JSON.stringify(r.data.user)); setUser(r.data.user); return { ok: true } }
    catch (e: any) { return { ok: false, error: e.response?.data?.error || 'Login failed' } }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    try { const r = await api.post('/auth/signup', { name, email, password }); localStorage.setItem('bk_token', r.data.token); localStorage.setItem('bk_user', JSON.stringify(r.data.user)); setUser(r.data.user); return { ok: true } }
    catch (e: any) { return { ok: false, error: e.response?.data?.error || 'Registration failed' } }
  }, [])

  const logout = useCallback(() => { localStorage.removeItem('bk_token'); localStorage.removeItem('bk_user'); setUser(null) }, [])
  const refresh = useCallback(async () => { try { const r = await api.get('/auth/me'); setUser(r.data.user); localStorage.setItem('bk_user', JSON.stringify(r.data.user)) } catch {} }, [])

  return <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>{children}</AuthContext.Provider>
}

export function useAuth() { const c = useContext(AuthContext); if (!c) throw new Error('useAuth must be within AuthProvider'); return c }
