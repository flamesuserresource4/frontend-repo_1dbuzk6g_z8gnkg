// Simple API helper for TapPay frontend
// Uses VITE_BACKEND_URL as base; falls back to same-origin 8000.

export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const setAuth = (token, user) => {
  localStorage.setItem('tappay_token', token)
  localStorage.setItem('tappay_user', JSON.stringify(user))
}

export const getToken = () => localStorage.getItem('tappay_token')
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('tappay_user')) } catch { return null }
}
export const clearAuth = () => {
  localStorage.removeItem('tappay_token')
  localStorage.removeItem('tappay_user')
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
