import React, { FC, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { paths } from '../paths'
import { IRoomActions } from '../actions/room'
import { ILoginUser } from '../types'
import { IUserActions } from '../actions/user'
import { useMessage } from '../hooks/useMessage'

export type IMapStateToProps = {
  loginUser: ILoginUser
}

export interface IDispatchProps {
  postMessage: (payload: IRoomActions['postMessage']['payload']) => Promise<void>
  setMessage: (payload: IRoomActions['setMessages']['payload']) => Promise<void>
  logout: (payload: IUserActions['logout']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

export const Room: FC<IProps> = ({ logout }) => {
  const history = useHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const { messages, addMessage, initialized } = useMessage()

  return (
    <div>
      <Helmet title="Room" />
      <h1>Room</h1>

      {!initialized ? (
        <p>fetching</p>
      ) : (
        <>
          <ul>
            {messages.map(test => (
              <li key={test.id}>
                [{test.name}]: {test.message}
              </li>
            ))}
          </ul>
          <br />
          <input
            type="text"
            ref={inputRef}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                sendButtonRef.current!.click()
              }
            }}
          />
          <button
            type="button"
            ref={sendButtonRef}
            onClick={() => {
              const message = inputRef.current!.value
              if (message.length === 0) {
                return
              }
              addMessage(message)
              inputRef.current!.value = ''
            }}
          >
            送信
          </button>
        </>
      )}
      <br />
      <button
        type="button"
        onClick={() => {
          logout({}).then(() => {
            history.push(paths.home)
          })
        }}
      >
        退出
      </button>
    </div>
  )
}
