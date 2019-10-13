import { useEffect, useState } from 'react'
import { firestore } from 'firebase'
import { ILoginUser, IMessage, IMessageForPost } from '../types'
import { db } from '../helpers/firebase'
import { COLLECTION } from '../firebase/constraints'

export const useMessage = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = db
      .collection(COLLECTION.MESSAGES)
      .orderBy('createdAt')
      .onSnapshot(async snapshot => {
        setInitialized(true)
        setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IMessage)))
      })

    return () => unsubscribe()
  }, [])

  const addMessage = async (user: ILoginUser, message: string) => {
    const data: IMessageForPost = {
      uid: user.uid,
      message,
      user: db.doc(`${COLLECTION.USERS}/${user.uid}`),
      userName: user.name,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }

    return db.collection(COLLECTION.MESSAGES).add(data)
  }

  return { messages, addMessage, initialized }
}
