import { ThunkAction } from 'redux-thunk'
import { ActionCreator, Dispatch } from 'redux'
import { firestore } from 'firebase'
import { ActionMapPickActions, IMessage, IMessageForPost } from '../types'
import { db } from '../helpers/firebase'

export enum ROOM_ACTION_TYPE {
  POST_MESSAGE = 'room/POST_MESSAGE',
  SET_MESSAGES = 'room/SET_MESSAGES',
}

interface IActions {
  postMessage: {
    type: ROOM_ACTION_TYPE.POST_MESSAGE
    payload: {
      message: string
    }
  }
  setMessages: {
    type: ROOM_ACTION_TYPE.SET_MESSAGES
    payload: {
      messages: IMessage[]
    }
  }
}

export type IRoomActionsTypes = ActionMapPickActions<IActions>
export type IRoomActions = IActions

export const roomPostMessageAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IRoomActions['postMessage']>
> = (payload: IRoomActions['postMessage']['payload']) => async (_dispatch: Dispatch) => {
  const data: IMessageForPost = {
    name: 'dummy',
    message: payload.message,
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

  // dispatch<IRoomActions['postMessage']>({
  //   type: ROOM_ACTION_TYPE.ENTER,
  //   payload,
  // })
}

export const roomSetMessagesAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IRoomActions['setMessages']>
> = (payload: IRoomActions['setMessages']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IRoomActions['setMessages']>({
    type: ROOM_ACTION_TYPE.SET_MESSAGES,
    payload,
  })
}
