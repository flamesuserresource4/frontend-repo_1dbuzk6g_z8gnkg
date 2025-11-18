// Auth screens: Signup/Login with handle validation and JWT storage
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [handle, setHandle] = useState('')
  const [img, setImg] = useState('')
  const [available, setAvailable] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setTimeout(async () => {
      if (handle.length >= 3) {
        try {
          const res = await fetch(`${API}/handle/check/${handle}`)
          const data = await res.json()
          setAvailable(data.available)
        } catch (e) {
          setAvailable(null)
        }
      }
    }, 350)
    return () => clearTimeout(id)
  }, [handle])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, handle, profileImg: img })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Sign up failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-6 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Poppins' }}>Create profile</h1>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <div>
            <div className="flex items-center gap-2">
              <span className="opacity-70">@</span>
              <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="handle" value={handle} onChange={e=>setHandle(e.target.value.toLowerCase())} required />
            </div>
            {handle && (
              <div className="mt-1 text-sm">
                {available === true && <span className="text-emerald-400">Handle available</span>}
                {available === false && <span className="text-rose-400">Handle taken</span>}
              </div>
            )}
          </div>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Profile image URL (optional)" value={img} onChange={e=>setImg(e.target.value)} />

          <button disabled={loading} className="w-full py-3 rounded-xl bg-[#00FFE0] text-black font-semibold shadow-[0_0_30px_#00FFE055] hover:shadow-[0_0_40px_#00FFE077] transition">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-sm text-white/70">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
      </div>
    </div>
  )
}

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white px-6 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Poppins' }}>Log in</h1>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full py-3 rounded-xl bg-[#00FFE0] text-black font-semibold shadow-[0_0_30px_#00FFE055] hover:shadow-[0_0_40px_#00FFE077] transition">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
