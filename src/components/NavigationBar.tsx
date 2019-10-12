import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
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
  const history = useHistory()

  return (
    <div>
      {loginUser && <h1>HI: {loginUser.name}</h1>}
      {loginUser && (
        <button
          type="button"
          onClick={() => {
            logout({}).then(() => {
              toast.warn('退出しました')
              history.push(paths.home)
            })
          }}
        >
          logout
        </button>
      )}
    </div>
  )
}
