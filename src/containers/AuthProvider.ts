import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IMapStateToProps, IDispatchProps, AuthProvider } from '../components/AuthProvider'
import { IUserActionsTypes, userSetAction } from '../actions/user'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    loginUser: state.user.user!,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  setUser: payload => dispatch(userSetAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider)
