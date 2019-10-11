import { ThunkAction } from 'redux-thunk'
import { ActionCreator, Dispatch } from 'redux'
import { ActionMapPickActions } from '../types'

export enum ROOM_ACTION_TYPE {
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}

interface IActions {
  enter: {
    type: ROOM_ACTION_TYPE.ENTER
    payload: {
      name: string
    }
  }
  leave: {
    type: ROOM_ACTION_TYPE.LEAVE
    payload: {}
  }
}

export type IRoomActionsTypes = ActionMapPickActions<IActions>
export type IRoomActions = IActions

export const roomEnterAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IRoomActions['enter']>
> = (payload: IRoomActions['enter']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IRoomActions['enter']>({
    type: ROOM_ACTION_TYPE.ENTER,
    payload,
  })
}

export const roomLeaveAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IRoomActions['leave']>
> = (payload: IRoomActions['leave']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IRoomActions['leave']>({
    type: ROOM_ACTION_TYPE.LEAVE,
    payload,
  })
}
