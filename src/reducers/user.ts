import { produce } from 'immer'
import { ActionMapPickActions } from '../types'

interface IUserState {
  name: string | null
}

const initialState: IUserState = {
  name: null,
}

export enum USER_ACTION_TYPE {
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}

interface IActions {
  enter: {
    type: USER_ACTION_TYPE.ENTER
    payload: {
      name: string
    }
  }
  leave: {
    type: USER_ACTION_TYPE.LEAVE
    payload: {}
  }
}

export type IUserActionsTypes = ActionMapPickActions<IActions>
export type IUserActions = IActions

export const userReducer = (state = initialState, action: IUserActionsTypes) =>
  produce<IUserState, IUserState>(state, draft => {
    switch (action.type) {
      case USER_ACTION_TYPE.ENTER: {
        draft.name = action.payload.name
        break
      }
      case USER_ACTION_TYPE.LEAVE: {
        draft.name = null
        break
      }
      default:
    }
  })
