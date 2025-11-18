// QRProfile: shows QR for user's handle with pulsating glow and share/save actions
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { API_BASE, apiGet } from '../lib/api'

export default function QRProfile(){
  const { handle } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    apiGet(`/profile/${handle}`).then(setProfile).catch(()=>setProfile(null))
  },[handle])

  const qrUrl = `${API_BASE}/qr/${handle}`

  function onShare(){
    const link = `https://tappay.me/${handle}`
    if (navigator.share) navigator.share({ title: 'TapPay', text: 'Pay me on TapPay', url: link })
    else navigator.clipboard.writeText(link)
  }

  function onSave(){
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = `${handle}_tappay_qr.png`
    a.click()
  }

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">Loading…</div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="font-[Poppins] text-3xl font-bold">@{handle}</h2>
      <p className="text-white/70">Scan to pay</p>

      <motion.div
        className="relative mt-8 p-4 rounded-2xl bg-white"
        initial={{ boxShadow: '0 0 0px #00FFE0' }}
        animate={{ boxShadow: ['0 0 0px #00FFE0','0 0 30px #00FFE055','0 0 0px #00FFE0'] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <img src={qrUrl} alt="QR" className="w-56 h-56" />
      </motion.div>

      <div className="mt-6 flex gap-3">
        <button onClick={onShare} className="px-4 py-2 rounded-xl bg-[#00FFE0] text-black font-semibold">Share</button>
        <button onClick={onSave} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">Save</button>
      </div>
    </div>
  )
}
