// actionTypeの型
import { firestore } from 'firebase'

export interface ActionType {
  type: string
  payload: {}
}

// MapからKeyを元に全てを取り出す
export type PickAll<T> = T[keyof T]

// ThunkActionsの定義からActionTypeに一致するものだけ取り出す
export type ThunkActionMapPickActions<T> = Extract<PickAll<PickAll<T>>, ActionType>

// Actionsの定義からActionTypeに一致するものだけ取り出す
export type ActionMapPickActions<T> = Extract<PickAll<T>, ActionType>

export type ILoginUser = {
  uid: string
  name: string
}

export interface IMessageForPost {
  uid: string
  message: string
  createdAt: firestore.FieldValue | null
  user: firestore.DocumentReference
  userName: string
}

export interface IMessage {
  id: string
  uid: string
  message: string
  user: firestore.DocumentReference
  userName: string
  createdAt: firestore.FieldValue | null
}
