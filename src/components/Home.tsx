import React, { FC, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { IUserActions } from '../reducers/user'
import { paths } from '../paths'
import { IStore } from '../stores'

export interface IMapStateToProps {
  user: IStore['user']
}

export interface IDispatchProps {
  enter: (payload: IUserActions['enter']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const Home: FC<IProps> = ({ enter }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  return (
    <div>
      <Helmet title="Home" />
      <h1>Home</h1>
      <input type="text" ref={inputRef} />
      <br />
      <button
        type="button"
        onClick={() => {
          enter({ name: inputRef.current!.value }).then(() => {
            history.push(paths.room)
          })
        }}
      >
        入室
      </button>
    </div>
  )
}
