import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Telestrator from './Telestrator'

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        // Define your dark theme colors here
      }
    },
    light: {
      palette: {
        // Define your light theme colors here
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <Telestrator />
    </CssVarsProvider>
  </StrictMode>,
)
