import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
// router
import  { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="896067105432-mmaaq34vcggd59dfm6tbrvf37n2uv2f2.apps.googleusercontent.com">
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GoogleOAuthProvider>,
)
