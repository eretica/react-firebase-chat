import { produce } from 'immer'
import { IRoomActionsTypes, ROOM_ACTION_TYPE } from '../actions/room'

interface IUserState {
  name: string | null
}

const initialState: IUserState = {
  name: null,
}

export const roomReducer = (state = initialState, action: IRoomActionsTypes) =>
  produce<IUserState, IUserState>(state, draft => {
    switch (action.type) {
      case ROOM_ACTION_TYPE.ENTER: {
        draft.name = action.payload.name
        break
      }
      case ROOM_ACTION_TYPE.LEAVE: {
        draft.name = null
        break
      }
      default:
    }
  })
