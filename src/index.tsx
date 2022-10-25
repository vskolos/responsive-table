import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css/normalize.css'
import 'the-new-css-reset/css/reset.css'
import './index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
