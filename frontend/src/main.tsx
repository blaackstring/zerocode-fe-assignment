import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ChatProvider from './contextApi/chatContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<ChatProvider>
  <App/>
</ChatProvider>
  </StrictMode>,
)
