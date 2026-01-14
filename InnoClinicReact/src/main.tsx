import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import React from 'react'
import { AuthProvider } from './modules/auth/hoocks/use-auth.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
