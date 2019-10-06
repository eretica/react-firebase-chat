import React, { FC, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router'
import { firestore } from 'firebase/app'
import { IStore } from '../stores'
import { IUserActions } from '../reducers/user'
import { paths } from '../paths'
import { db } from '../firebase'

export type IMapStateToProps = {
  user: IStore['user']
}

export interface IDispatchProps {
  leave: (payload: IUserActions['leave']['payload']) => Promise<void>
}

type IProps = IMapStateToProps & IDispatchProps

interface IMessage {
  name: string
  message: string
  fetchedAt: firestore.Timestamp | null
  createdAt: firestore.FieldValue | null
}

export const Room: FC<IProps> = ({ user, leave }) => {
  const history = useHistory()
  const inputRef = useRef<HTMLInputElement>(null)
  const [tests, setTests] = useState<{ name: string; message: string }[]>([])

  const addMessage = (message: string) => {
    const data: IMessage = {
      name: user.name!,
      message,
      fetchedAt: firestore.Timestamp.fromDate(new Date(0)),
      createdAt: firestore.FieldValue.serverTimestamp(),
    }

    db.collection('tests')
      .add(data)
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error: any) => {
        console.error('Error writing document: ', error)
      })
  }

  useEffect(() => {
    db.collection('tests')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data() as IMessage)
        setTests(data)
      })
  }, [])

  return (
    <div>
      <Helmet title="Room" />
      <h1>Room</h1>
      hi {user.name}
      <ul>
        {tests.map(test => (
          <li key={test.message}>
            [{test.name}]: {test.message}
          </li>
        ))}
      </ul>
      <br />
      <input type="text" ref={inputRef} />
      <button
        type="button"
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