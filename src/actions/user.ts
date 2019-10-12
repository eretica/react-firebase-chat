import { ThunkAction } from 'redux-thunk'
import { ActionCreator, Dispatch } from 'redux'
import { ActionMapPickActions, ILoginUser, ThunkActionMapPickActions } from '../types'
import { auth } from '../helpers/firebase'

export enum USER_ACTION_TYPE {
  LOGIN = 'user/LOGIN',
  LOGOUT = 'user/LOGOUT',
  SET = 'user/SET',
}

interface IThunkActions {
  login: {
    payload: {
      name: string
    }
    success: {
      type: USER_ACTION_TYPE.LOGIN
      payload: {
        user: ILoginUser
      }
    }
  }
  logout: {
    payload: {}
    success: {
      type: USER_ACTION_TYPE.LOGOUT
      payload: {}
    }
  }
}

interface IActions {
  set: {
    type: USER_ACTION_TYPE.SET
    payload: {
      user: ILoginUser | null
    }
  }
}

export type IUserActionsTypes = ThunkActionMapPickActions<IThunkActions> &
  ActionMapPickActions<IActions>
export type IUserActions = IThunkActions & IActions

export const userLoginAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IUserActions['login']['success']>
> = (payload: IUserActions['login']['payload']) => async (dispatch: Dispatch) => {
  const credential = await auth.signInAnonymously().catch(e => {
    throw e
  })

  await credential.user!.updateProfile({
    displayName: payload.name,
  })

  dispatch<IUserActions['login']['success']>({
    type: USER_ACTION_TYPE.LOGIN,
    payload: {
      user: {
        uid: credential.user!.uid,
        name: payload.name,
      },
    },
  })
}

export const userLogoutAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IUserActions['logout']['success']>
> = (payload: IUserActions['logout']['payload']) => async (dispatch: Dispatch) => {
  auth.signOut()

  dispatch<IUserActions['logout']['success']>({
    type: USER_ACTION_TYPE.LOGOUT,
    payload,
  })
}

export const userSetAction: ActionCreator<
  ThunkAction<Promise<void>, {}, void, IUserActions['set']>
> = (payload: IUserActions['set']['payload']) => async (dispatch: Dispatch) => {
  dispatch<IUserActions['set']>({
    type: USER_ACTION_TYPE.SET,
    payload,
  })
}
