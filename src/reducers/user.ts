import { produce } from 'immer'
import { IUserActionsTypes, USER_ACTION_TYPE } from '../actions/user'
import { ILoginUser } from '../types'

interface IUserState {
  user: ILoginUser | null
}

const initialState: IUserState = {
  user: null,
}

export const userReducer = (state = initialState, action: IUserActionsTypes) =>
  produce<IUserState, IUserState>(state, draft => {
    switch (action.type) {
      case USER_ACTION_TYPE.LOGIN: {
        draft.user = action.payload.user
        break
      }
      case USER_ACTION_TYPE.SET: {
        draft.user = action.payload.user
        break
      }
      case USER_ACTION_TYPE.LOGOUT: {
        draft.user = null
        break
      }
      default:
    }
  })
