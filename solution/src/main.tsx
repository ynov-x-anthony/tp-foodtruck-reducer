import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode monte les composants deux fois en dev (jamais en prod) pour
// révéler les effets de bord non idempotents : utile ici pour vérifier que
// cartReducer reste bien une fonction pure.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
