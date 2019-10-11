import React, { FC, useEffect, useState } from 'react'
import { auth } from '../helpers/firebase'
import { ILoginUser } from '../types'
import { IUserActions } from '../actions/user'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  setUser: (payload: IUserActions['set']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const AuthProvider: FC<IProps> = ({ setUser, children }) => {
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

  return initialized ? <>{children}</> : <h1>...loading</h1>
}
