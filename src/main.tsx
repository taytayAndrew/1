import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import vhCheck from 'vh-check'
import { App } from './App'
const test = vhCheck()
const div = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(div)
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)

export {div as rootDiv}