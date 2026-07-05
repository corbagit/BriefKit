import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

interface SummaryData {
  id: string; title: string; summary: string; key_takeaways: string[]; actionable_insights: string[]; source_url: string | null; source_text: string | null; created_at: string
}

export default function Summary() {
  const { id } = useParams()
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) api.get(`/summaries/${id}`).then(r => setData(r.data.summary)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>
  if (!data) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-slate-400">Summary not found</div>

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <nav className="border-b border-slate-800 p-4 max-w-4xl mx-auto flex items-center gap-4">
        <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm">← Back</Link>
        <span className="text-white font-display font-bold">CorbaBriefKit</span>
      </nav>

      <main className="max-4xl mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-white font-display mb-6">{data.title}</h1>

        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Summary</h2>
            <p className="text-slate-300 leading-relaxed">{data.summary}</p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Key Takeaways</h2>
            <ul className="space-y-2">
              {data.key_takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Insights */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Actionable Insights</h2>
            <ul className="space-y-2">
              {data.actionable_insights.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-amber-400 mt-1">→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Source */}
          {data.source_url && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Source</h2>
              <a href={data.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm break-all">{data.source_url}</a>
            </div>
          )}

          <p className="text-xs text-slate-600 text-center">Created {new Date(data.created_at).toLocaleDateString()}</p>
        </div>
      </main>
    </div>
  )
}
