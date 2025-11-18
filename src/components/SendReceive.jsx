// Send/Receive screen with gestures and tap ripple
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function SendReceive() {
  const [mode, setMode] = useState('send') // 'send' | 'receive'
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('') // handle
  const [feedback, setFeedback] = useState(null)
  const rippleRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const token = localStorage.getItem('token')

  const submit = async () => {
    if (!token) return alert('Log in')
    if (mode === 'send') {
      try {
        const res = await fetch(`${API}/transaction/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ toHandle: to, amount: parseFloat(amount) })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || 'Failed')
        setFeedback('sent')
        triggerRipple()
      } catch (e) {
        alert(e.message)
      }
    }
  }

  const triggerRipple = () => {
    const el = rippleRef.current
    if (!el) return
    el.animate([
      { boxShadow: '0 0 0 0 rgba(0,255,224,0.6)' },
      { boxShadow: '0 0 0 30px rgba(0,255,224,0)' }
    ], { duration: 600, easing: 'ease-out' })
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-6 py-12">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <button onClick={() => setMode('send')} className={`px-4 py-2 rounded-lg ${mode==='send'?'bg-[#00FFE0] text-black':'bg-white/5'}`}>Send</button>
          <button onClick={() => setMode('receive')} className={`px-4 py-2 rounded-lg ${mode==='receive'?'bg-[#FFF600] text-black':'bg-white/5'}`}>Receive</button>
        </div>

        {mode === 'send' ? (
          <div className="mt-8 space-y-4">
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="@handle" value={to} onChange={e=>setTo(e.target.value.replace('@',''))} />
            <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
            <button ref={rippleRef} onClick={submit} className="w-full py-3 rounded-xl bg-[#00FFE0] text-black font-semibold">Tap to Send</button>
            {feedback === 'sent' && <p className="text-emerald-400">Payment sent!</p>}
          </div>
        ) : (
          <div className="mt-8">
            <p>Your link:</p>
            <div className="mt-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 break-all">https://tappay.me/{user?.handle}</div>
            <button onClick={() => navigator.clipboard.writeText(`https://tappay.me/${user?.handle}`)} className="mt-3 px-4 py-2 rounded-lg bg-white/10 border border-white/20">Copy link</button>
          </div>
        )}
      </div>
    </div>
  )
}
