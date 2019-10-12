import React, { FC, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { ILoginUser } from '../types'
import { useMessage } from '../hooks/useMessage'

export type IMapStateToProps = {
  loginUser: ILoginUser
}

type IProps = IMapStateToProps

export const Room: FC<IProps> = ({ loginUser }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const { messages, addMessage, initialized } = useMessage()

  return (
    <div>
      <Helmet title="Room" />
      <h1>Room</h1>
      <p>{loginUser.name}</p>

      {!initialized ? (
        <p>fetching</p>
      ) : (
        <>
          <ul>
            {messages.map(test => (
              <li key={test.id}>
                [{test.userName}]: {test.message}
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
              addMessage(loginUser, message).catch(() => {
                toast.error('メッセージが送信できませんでした')
              })
              inputRef.current!.value = ''
            }}
          >
            送信
          </button>
        </>
      )}
    </div>
  )
}
