// Dashboard screen with totals, history, and simple bar chart
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bar({ value=0, label='' }){
  const h = Math.min(100, value)
  return (
    <div className="flex flex-col items-center">
      <div className="w-6 bg-[#00FFE0] rounded-t" style={{ height: `${h}%` }} />
      <span className="text-xs mt-1 opacity-70">{label}</span>
    </div>
  )
}

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(()=>{
    const u = localStorage.getItem('user')
    if (u) setUser(JSON.parse(u))
  }, [])

  useEffect(()=>{
    if (!user) return
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}` }
    fetch(`${API}/dashboard/stats`, { headers }).then(r=>r.json()).then(setStats)
    fetch(`${API}/transaction/history/${user.id}`, { headers }).then(r=>r.json()).then(setHistory)
  }, [user])

  if (!user) return <div className="min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center">Log in first</div>

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-6 py-10">
      <h1 className="text-3xl font-bold" style={{ fontFamily: 'Poppins' }}>Dashboard</h1>

      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-white/70 text-sm">Total Sent</div>
            <div className="text-2xl font-semibold">${'{'}stats.total_sent.toFixed(2){'}'}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-white/70 text-sm">Total Received</div>
            <div className="text-2xl font-semibold">${'{'}stats.total_received.toFixed(2){'}'}</div>
          </div>
        </div>
      )}

      {/* Simple bar visualization */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex gap-3 items-end h-32">
          <Bar value={stats ? stats.count_sent * 20 : 0} label="Sent" />
          <Bar value={stats ? stats.count_received * 20 : 0} label="Recv" />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Recent</h2>
        <div className="space-y-2">
          {history.map(h => (
            <div key={h.id} className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between">
              <div>
                <div className="text-sm opacity-70">{new Date(h.timestamp).toLocaleString()}</div>
                <div className="text-sm">{h.fromUser === user.id ? 'To' : 'From'} {h.fromUser === user.id ? h.toUser : h.fromUser}</div>
              </div>
              <div className={h.fromUser === user.id ? 'text-rose-400' : 'text-emerald-400'}>
                {h.fromUser === user.id ? '-' : '+'}${'{'}h.amount.toFixed(2){'}'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
