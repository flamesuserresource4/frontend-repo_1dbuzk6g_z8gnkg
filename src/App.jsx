import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Splash from './components/Splash'
import { Signup, Login } from './components/Auth'
import QRProfile from './components/QRProfile'
import SendReceive from './components/SendReceive'
import Dashboard from './components/Dashboard'

function Nav(){
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1A1A1A]/60 backdrop-blur border-b border-white/10 text-white">
      <Link to="/" className="font-bold" style={{ fontFamily: 'Poppins' }}>TapPay</Link>
      <div className="flex items-center gap-3 text-sm">
        <Link to="/send" className="opacity-80 hover:opacity-100">Send</Link>
        <Link to="/qr" className="opacity-80 hover:opacity-100">QR</Link>
        <Link to="/dashboard" className="opacity-80 hover:opacity-100">Dashboard</Link>
        {user ? (
          <button onClick={()=>{localStorage.clear(); location.href='/'}} className="bg-white/10 px-3 py-1.5 rounded-lg">Logout</button>
        ) : (
          <Link to="/login" className="bg-white/10 px-3 py-1.5 rounded-lg">Login</Link>
        )}
      </div>
    </div>
  )
}

function App(){
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/create-profile" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qr" element={<QRProfile />} />
          <Route path="/send" element={<SendReceive />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
