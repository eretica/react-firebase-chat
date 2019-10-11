import { useEffect, useState } from 'react'
import { firestore } from 'firebase'
import { IMessage, IMessageForPost } from '../types'
import { db } from '../helpers/firebase'

export const useMessage = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = db
      .collection('tests')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        setInitialized(true)
        const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as IMessage))
        setMessages(data)
      })

    return () => unsubscribe()
  }, [])

  const addMessage = async (message: string) => {
    const data: IMessageForPost = {
      name: 'dummy',
      message,
      // fetchedAt: firestore.Timestamp.fromDate(new Date(0)),
      createdAt: firestore.FieldValue.serverTimestamp(),
    }

    await db
      .collection('tests')
      .add(data)
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error: any) => {
        console.error('Error writing document: ', error)
      })
  }

  return { messages, addMessage, initialized }
}
