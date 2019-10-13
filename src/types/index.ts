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

interface IMessageBase {
  uid: string
  message: string
  user: firestore.DocumentReference
  userName: string
}

export interface IMessageForPost extends IMessageBase {
  createdAt: firestore.FieldValue | null
}

export interface IMessage extends IMessageBase {
  id: string
  createdAt: firestore.Timestamp | null
}
