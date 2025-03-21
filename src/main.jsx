import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/Route';
import AuthProvider from './provider/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SocketProvider } from './provider/SocketProvider';

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
)