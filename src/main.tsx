import ReactDOM from 'react-dom/client'
import {ThemeProvider, configure} from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import "firebase/firestore"

import App from '@/app/App.tsx'
import './reset.scss'
import './main.scss'

configure({
    lang: 'en',
})

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('Root element not found')
}

ReactDOM.createRoot(rootEl).render(
    <ThemeProvider theme="dark">
        <App />
    </ThemeProvider>,
)
