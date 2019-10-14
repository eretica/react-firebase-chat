import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { store } from './stores'
import AuthProvider from './containers/AuthProvider'

ReactDOM.render(
  <Provider store={store}>
    {/* 通知用のProvider */}
    <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={2000} />
    {/* 認証用。ログインとかログイン中とかしてくれる */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
