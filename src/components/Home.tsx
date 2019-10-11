import React, { FC, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { paths } from '../paths'
import { IUserActions } from '../actions/user'

export interface IDispatchProps {
  login: (payload: IUserActions['login']['payload']) => Promise<void>
}

type IProps = IDispatchProps

export const Home: FC<IProps> = ({ login }) => {
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
          const name = inputRef.current!.value

          if (name.length === 0) {
            return
          }

          login({ name }).then(() => {
            history.push(paths.room)
          })
        }}
      >
        入室
      </button>
    </div>
  )
}
