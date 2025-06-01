import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/route.jsx'
import { Provider } from 'react-redux'
import store from './redux/Store.js'
import { ApolloProvider } from '@apollo/client';
import client from './apollo/ApolloClient.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </ApolloProvider>
  </StrictMode>,
)
