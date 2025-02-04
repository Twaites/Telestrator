import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Telestrator from './Telestrator'

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#121212',
          surface: '#1E1E1E',
          level1: '#242424',
          level2: '#2A2A2A',
          level3: '#303030',
        },
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Add neutral palette to ensure consistent grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider 
      theme={theme} 
      defaultMode="dark"
      modeStorageKey="telestrator-color-scheme"
    >
      <Telestrator />
    </CssVarsProvider>
  </StrictMode>,
)
