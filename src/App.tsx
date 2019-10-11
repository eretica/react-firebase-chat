import React, { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { paths } from './paths'
import Home from './containers/Home'
import Room from './containers/Room'
import Auth from './containers/Auth'
import AuthProvider from './containers/AuthProvider'
import NavigationBar from './containers/NavigationBar'

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <AuthProvider>
          <Route exact path={paths.home} component={Home} />
          <Auth>
            <Route exact path={paths.room} component={Room} />
          </Auth>
          <Redirect to={paths.home} />
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default App
