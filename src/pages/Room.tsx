import React, { FC, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { animateScroll } from 'react-scroll'
import { ILoginUser } from '../types'
import { useMessage } from '../hooks/useMessage'
import { Loading } from '../components/Loading'
import { Hider } from '../components/Hider'
import { Messages } from '../components/Messages'
import { FloatTextForm } from '../components/Form/FloatTextForm'

const SCROLL_DURATION = 800

export type IMapStateToProps = {
  loginUser: ILoginUser
}

type IProps = IMapStateToProps

export const Room: FC<IProps> = ({ loginUser }) => {
  const prevCountRef = useRef(0)
  const { messages, addMessage, initialized } = useMessage()

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: prevCountRef.current ? SCROLL_DURATION : 0,
    })
    prevCountRef.current = messages.length
  }, [messages])

  return (
    <div>
      <Helmet title="Room" />
      <Hider isHide={!initialized} insteadOf={<Loading />}>
        <Messages loginUser={loginUser} messages={messages} />
      </Hider>

      <FloatTextForm
        label="メッセージ"
        onSubmit={values => {
          addMessage(loginUser, values.text).catch(() => {
            toast.error('メッセージが送信できませんでした')
          })
        }}
      />
    </div>
  )
}
