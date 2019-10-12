import React, { FC } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { paths } from './paths'
import Home from './containers/Home'
import Room from './containers/Room'
import Auth from './containers/Auth'
import NavigationBar from './containers/NavigationBar'

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path={paths.home} component={Home} />
        <Auth>
          <Route exact path={paths.room} component={Room} />
          <Redirect to={paths.room} />
        </Auth>
        <Redirect to={paths.home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
