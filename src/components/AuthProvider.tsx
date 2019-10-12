import React, { FC, useEffect, useState } from 'react'
import { auth } from '../helpers/firebase'
import { ILoginUser } from '../types'
import { IUserActions } from '../actions/user'
import { useUser } from '../hooks/useUser'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  setUser: (payload: IUserActions['set']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const AuthProvider: FC<IProps> = ({ setUser, children }) => {
  const [initialized, setInitialized] = useState(false)
  const { updateUser } = useUser()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(credential => {
      if (credential) {
        updateUser(credential)
      }

      setUser({
        user: credential
          ? {
              uid: credential.uid,
              name: credential.displayName!,
            }
          : null,
      }).finally(() => {
        setInitialized(true)
      })
    })

    return () => unsubscribe()
  }, [])

  return initialized ? <>{children}</> : <h1>...loading</h1>
}
