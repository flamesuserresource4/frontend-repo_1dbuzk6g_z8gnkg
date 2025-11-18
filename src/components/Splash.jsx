// Splash screen with neon gradient, faster micro-tap animation, and Spline hero (performance-tuned)
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Splash() {
  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white overflow-hidden">
      {/* Neon gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#00FFE022,transparent_40%),radial-gradient(circle_at_80%_30%,#FFF60022,transparent_40%),radial-gradient(circle_at_50%_80%,#2D0C57aa,transparent_50%)]" />

      {/* Spline Hero (lazy + overlay) */}
      <div className="relative h-[48vh] md:h-[52vh] w-full">
        <Suspense
          fallback={<div className="w-full h-full flex items-center justify-center text-white/60">Loading scene…</div>}
        >
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A66] to-[#1A1A1A]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 -mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold tracking-tight flex items-center gap-3"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          TapPay
          <span className="text-[#1A1A1A] bg-[#00FFE0] px-2.5 py-1 rounded-md text-2xl md:text-3xl leading-none tracking-tight shadow-[0_0_30px_#00FFE055]">
            LD
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
          className="mt-3 text-base md:text-lg text-white/80 max-w-2xl"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Instant peer‑to‑peer payments with QR, handles, and a satisfying tap to send.
        </motion.p>

        <div className="mt-7 flex gap-4">
          <Link to="/create-profile" className="px-5 py-3 rounded-xl bg-[#00FFE0] text-black font-semibold shadow-[0_0_30px_#00FFE055] hover:shadow-[0_0_40px_#00FFE077] transition">Create profile</Link>
          <Link to="/login" className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 transition">Log in</Link>
        </div>

        {/* Faster micro tap animation */}
        <div className="mt-10">
          <motion.div
            className="relative w-16 h-16 rounded-full bg-[#2D0C57] flex items-center justify-center select-none"
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-[#00FFE0] font-semibold">Tap</span>
            {[0,1,2].map(i => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border border-[#00FFE0]"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0.6, 0], scale: [1, 2.1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.28, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
