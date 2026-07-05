import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Summary from './pages/Summary'

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function Public({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function Routes_() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Public><Login /></Public>} />
    <Route path="/register" element={<Public><Register /></Public>} />
    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
    <Route path="/summary/:id" element={<Protected><Summary /></Protected>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default function App() {
  return <BrowserRouter>
    <AuthProvider>
      <Routes_ />
    </AuthProvider>
  </BrowserRouter>
}
