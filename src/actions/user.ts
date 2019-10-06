import { ThunkAction } from 'redux-thunk'
import { ActionCreator, Dispatch } from 'redux'
import { IUserActions, USER_ACTION_TYPE } from '../reducers/user'
import { IStore } from '../stores'

export const userEnterAction: ActionCreator<
  ThunkAction<Promise<void>, IStore, void, IUserActions['enter']>
> = (payload: IUserActions['enter']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IUserActions['enter']>({
    type: USER_ACTION_TYPE.ENTER,
    payload,
  })
}

export const userLeaveAction: ActionCreator<
  ThunkAction<Promise<void>, IStore, void, IUserActions['leave']>
> = (payload: IUserActions['leave']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IUserActions['leave']>({
    type: USER_ACTION_TYPE.LEAVE,
    payload,
  })
}
