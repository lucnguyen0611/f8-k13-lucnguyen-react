import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StoreProvider } from './store/index.tsx'

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
)


