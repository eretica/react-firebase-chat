import React, { FC } from 'react'
import useReactRouter from 'use-react-router'
import { auth } from '../helpers/firebase'
import { ILoginUser } from '../types'
import { IUserActions } from '../actions/user'
import { paths } from '../paths'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  logout: (payload: IUserActions['logout']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const NavigationBar: FC<IProps> = ({ loginUser, logout }) => {
  const { history } = useReactRouter()

  return (
    <div>
      {loginUser && <h1>HI: {loginUser.displayName}</h1>}

      {loginUser && (
        <button
          type="button"
          onClick={() => {
            logout({}).then(() => {
              history.push(paths.home)
            })
          }}
        >
          logout
        </button>
      )}

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
    </div>
  )
}

export default NavigationBar
