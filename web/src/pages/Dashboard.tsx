import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

interface Summary {
  id: string; title: string; source_url: string | null; created_at: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [usage, setUsage] = useState({ used: 0, limit: 5, remaining: 5 })
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/summaries').then(r => setSummaries(r.data.summaries)).catch(() => {})
    api.get('/summaries/usage/stats').then(r => setUsage(r.data)).catch(() => {})
  }, [])

  const handleSummarize = async () => {
    if (!url && !text) { setError('Paste a URL or enter text'); return }
    setError(''); setLoading(true)
    try {
      const r = await api.post('/summaries/create', { url: url || undefined, text: text || undefined })
      navigate(`/summary/${r.data.summary.id}`)
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to create summary')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <nav className="border-b border-slate-800 p-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/"><span className="text-xl font-bold text-white font-display">📋 CorbaBriefKit</span></Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{usage.used}/{usage.limit} summaries</span>
          {user ? (
            <button onClick={() => { localStorage.removeItem('bk_token'); localStorage.removeItem('bk_user'); window.location.href = '/' }} className="text-sm text-slate-400 hover:text-white">Logout</button>
          ) : (
            <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">Login</Link>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {/* Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 font-display">Summarize anything</h2>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste article URL..." className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm mb-3 focus:outline-none focus:border-blue-500" />
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Or paste text directly..." rows={3} className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm mb-4 focus:outline-none focus:border-blue-500" />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">{usage.remaining} summaries remaining this month</span>
            <button onClick={handleSummarize} disabled={loading} className="ml-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer">
              {loading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </div>

        {/* Recent */}
        <h3 className="text-white font-semibold mb-4 font-display">Recent Summaries</h3>
        {summaries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">No summaries yet. Paste a URL above to get started.</div>
        ) : (
          <div className="space-y-3">
            {summaries.map(s => (
              <Link key={s.id} to={`/summary/${s.id}`} className="block bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition">
                <h4 className="text-white font-medium text-sm">{s.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  {s.source_url && <span className="truncate">{s.source_url}</span>}
                  <span>{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
