import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { paths } from './paths'
import Home from './containers/Home'
import Room from './containers/Room'
import { auth } from './helpers/firebase'
import Auth from './containers/Auth'

const App: FC = () => {
  return (
    <BrowserRouter>
      <button
        type="button"
        onClick={() => {
          auth.signInAnonymously().then(credential => {
            credential.user!.updateProfile({
              displayName: 'akaaan',
            })
          })
        }}
      >
        login
      </button>

      <button
        type="button"
        onClick={() => {
          auth.signOut()
        }}
      >
        logout
      </button>

      <button
        type="button"
        onClick={() => {
          const user = auth.currentUser
          if (!user) {
            console.log('none')
            return
          }

          console.log(user)
        }}
      >
        show
      </button>
      <button
        type="button"
        onClick={() => {
          const user = auth.currentUser
          if (!user) {
            console.log('none')
            return
          }

          user.updateProfile({
            displayName: Date().toString(),
          })

          console.log(user)
        }}
      >
        update
      </button>
      <Switch>
        <Route exact path={paths.home} component={Home} />
        <Auth>
          <Route exact path={paths.room} component={Room} />
        </Auth>
      </Switch>
    </BrowserRouter>
  )
}

export default App
