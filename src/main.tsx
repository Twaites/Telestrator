import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Telestrator from './Telestrator'

const theme = extendTheme({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <Telestrator />
    </CssVarsProvider>
  </StrictMode>,
)
