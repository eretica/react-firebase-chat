import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { paths } from '../paths'
import { IStore } from '../stores'
import { auth } from '../helpers/firebase'
import { IUserActions } from '../actions/user'

export interface IMapStateToProps {
  user: IStore['user']['user']
}

export interface IDispatchProps {
  setUser: (payload: IUserActions['set']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const Auth: FC<IProps> = ({ children, user, setUser }) => {
  const history = useHistory()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(credential => {
      setUser({
        user: credential,
      }).finally(() => {
        setInitialized(true)
      })
    })
  }, [])

  if (!initialized) {
    return <p>loading</p>
  }

  if (!user && initialized) {
    history.push(paths.home)
    return null
  }

  return user ? <>{children}</> : <p>...loading</p>
}
