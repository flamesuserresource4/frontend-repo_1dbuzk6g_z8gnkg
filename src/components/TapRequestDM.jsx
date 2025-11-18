// TapRequestDM: payment request link + copy + simple AI suggestions mock
import { useState, useEffect } from 'react'
import { getUser } from '../lib/api'

const SUGGESTIONS = [
  'You recently split a ride with Alex — send a $8 request?',
  'Taylor bought coffee yesterday — ask for $5 back?',
  'Recurring rent split due in 3 days — send request now?'
]

export default function TapRequestDM(){
  const me = getUser()
  const [copied, setCopied] = useState(false)
  const link = me ? `https://tappay.me/${me.handle}` : 'Create a profile first'

  function copy(){
    if (!me) return
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(()=>setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto">
      <h2 className="font-[Poppins] text-3xl font-bold">Payment Request</h2>
      <p className="text-white/70">Share your link or copy to clipboard.</p>

      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="font-[Roboto Mono] break-all">{link}</p>
        <button onClick={copy} className="mt-3 px-4 py-2 rounded-xl bg-[#00FFE0] text-black font-semibold">{copied? 'Copied!':'Copy link'}</button>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-white/90">Smart suggestions</h3>
        <ul className="mt-3 space-y-2 text-white/80 list-disc list-inside">
          {SUGGESTIONS.map((s,i)=>(<li key={i}>{s}</li>))}
        </ul>
      </div>
    </div>
  )
}
