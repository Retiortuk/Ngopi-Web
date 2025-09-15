import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/index.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {Toaster} from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider >
      <Toaster
        position='bottom-center'
        reverseOrder={false}
        containerStyle={{
          marginBottom: '5px'
        }}
        toastOptions={{
          duration: 4000,
        }}
      />
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
)
