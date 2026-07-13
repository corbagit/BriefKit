import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!name || !email || !password) { setError('Fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/dashboard')
    } catch (e: any) {
      setError(e.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
    <div className="w-full max-w-sm">
      <div className="text-center mb-8"><Link to="/"><span className="text-2xl font-bold text-white font-display">📋 CorbaBriefKit</span></Link></div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h1 className="text-xl font-bold text-white mb-6 font-display">Create Account</h1>
        {error && <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-xl">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500" />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password (6+ chars)" className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500" />
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer">{loading ? 'Creating account...' : 'Create Account'}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link></p>
      </div>
    </div>
  </div>
}
