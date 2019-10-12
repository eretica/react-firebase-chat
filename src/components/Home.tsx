import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import useRouter from 'use-react-router'
import { toast } from 'react-toastify'
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
  const { history } = useRouter()
  const [posting, setPosting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const loginButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!loginUser) {
      return
    }

    history.push(paths.room)
  }, [loginUser])

  return (
    <div>
      <Helmet title="Home" />
      <h1>Home</h1>
      <input
        type="text"
        ref={inputRef}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            loginButtonRef.current!.click()
          }
        }}
      />
      <br />
      <button
        type="button"
        disabled={posting}
        ref={loginButtonRef}
        style={{ color: posting ? 'blue' : 'red' }}
        onClick={() => {
          const name = inputRef.current!.value

          if (name.length === 0) {
            return
          }

          setPosting(true)
          login({ name })
            .then(() => {
              toast.success('入室しました')
            })
            .catch(() => {
              toast.error('入室できませんでした')
              setPosting(false)
            })
        }}
      >
        入室
      </button>
    </div>
  )
}
