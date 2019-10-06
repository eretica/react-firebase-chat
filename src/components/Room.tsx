import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { IStore } from '../stores'
import { IUserActions } from '../reducers/user'
import { paths } from '../paths'

export type IMapStateToProps = {
  user: IStore['user']
}

export interface IDispatchProps {
  leave: (payload: IUserActions['leave']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const Room: FC<IProps> = ({ user, leave }) => {
  const history = useHistory()

  return (
    <div>
      <Helmet title="Room" />
      <h1>Room</h1>
      hi {user.name}
      <br />
      <button
        type="button"
        onClick={() => {
          leave({}).then(() => {
            history.push(paths.home)
          })
        }}
      >
        退出
      </button>
    </div>
  )
}
