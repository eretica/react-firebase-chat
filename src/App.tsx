import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { paths } from './paths'
import Home from './containers/Home'
import Room from './containers/Room'
// import { db } from './firebase'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.home} component={Home} />
        <Route exact path={paths.room} component={Room} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
