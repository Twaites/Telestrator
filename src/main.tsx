import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import Telestrator from './Telestrator'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Telestrator />
    </Provider>
  </StrictMode>,
)
