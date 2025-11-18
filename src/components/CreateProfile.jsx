// CreateProfile: name, handle, password, image URL with real-time handle validation
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiPost, apiGet, setAuth } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function CreateProfile() {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')
  const [img, setImg] = useState('')
  const [status, setStatus] = useState(null)
  const [validating, setValidating] = useState(false)
  const [available, setAvailable] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!handle) { setAvailable(null); return }
    const h = setTimeout(async () => {
      setValidating(true)
      try {
        await apiGet(`/profile/${handle}`)
        setAvailable(false)
      } catch (e) {
        setAvailable(true)
      } finally { setValidating(false) }
    }, 400)
    return () => clearTimeout(h)
  }, [handle])

  async function onSubmit(e){
    e.preventDefault()
    try {
      const res = await apiPost('/auth/signup', { name, handle, password, profileImg: img || undefined })
      setAuth(res.token, { id: res.userId, handle: res.handle, name: res.name, profileImg: res.profileImg })
      navigate(`/qr/${res.handle}`)
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-md mx-auto">
      <h2 className="font-[Poppins] text-3xl font-bold">Create your TapPay</h2>
      <p className="text-white/70 mt-1">Claim your @handle and start sending instantly.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <label className="text-sm text-white/70">Full name</label>
          <input className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-white/70 flex items-center gap-2">@handle
            {validating && <span className="text-xs">checking…</span>}
            {available === true && <span className="text-xs text-emerald-400">available</span>}
            {available === false && <span className="text-xs text-rose-400">taken</span>}
          </label>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-3 py-3 rounded-xl bg-white/5 border border-white/10">@</span>
            <input className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3" value={handle} onChange={e=>setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9]/g,''))} required />
          </div>
        </div>
        <div>
          <label className="text-sm text-white/70">Password</label>
          <input type="password" className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-white/70">Profile image URL (optional)</label>
          <input className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3" value={img} onChange={e=>setImg(e.target.value)} />
        </div>

        <button className="w-full py-3 rounded-xl bg-[#00FFE0] text-black font-semibold shadow-[0_0_30px_#00FFE055]">Create</button>
      </form>

      {status && <p className="mt-4 text-rose-400 text-sm font-[Roboto Mono]">{status}</p>}
    </div>
  )
}
