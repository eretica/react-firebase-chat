import React, { FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import useRouter from 'use-react-router'
import { paths } from '../paths'
import { IUserActions } from '../actions/user'
import { ILoginUser } from '../types'

export interface IMapStateToProps {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  login: (payload: IUserActions['login']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const Home: FC<IProps> = ({ login, loginUser }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { history } = useRouter()

  useEffect(() => {
    console.log(loginUser)
    if (!loginUser) {
      return
    }

    history.push(paths.room)
  }, [loginUser])

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

          login({ name })
        }}
      >
        入室
      </button>
    </div>
  )
}
