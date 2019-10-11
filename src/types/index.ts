// actionTypeの型
import { firestore, UserInfo } from 'firebase'

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

export type ILoginUser = UserInfo

export interface IMessageForPost {
  name: string
  message: string
  createdAt: firestore.FieldValue | null
}

export interface IMessage {
  id: string
  name: string
  message: string
  createdAt: firestore.FieldValue | null
}
