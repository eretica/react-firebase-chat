import { produce } from 'immer'
import { IRoomActionsTypes, ROOM_ACTION_TYPE } from '../actions/room'
import { IMessage } from '../types'

interface IUserState {
  messages: IMessage[]
}

const initialState: IUserState = {
  messages: [],
}

export const roomReducer = (state = initialState, action: IRoomActionsTypes) =>
  produce<IUserState, IUserState>(state, draft => {
    switch (action.type) {
      case ROOM_ACTION_TYPE.POST_MESSAGE: {
        // draft.name = action.payload.name
        break
      }
      case ROOM_ACTION_TYPE.SET_MESSAGES: {
        draft.messages = action.payload.messages
        // draft.name = null
        break
      }
      default:
    }
  })
