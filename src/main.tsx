import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Telestrator from './Telestrator'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Telestrator />
  </StrictMode>,
)
