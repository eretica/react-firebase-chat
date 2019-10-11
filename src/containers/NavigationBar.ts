import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IMapStateToProps, IDispatchProps, NavigationBar } from '../components/NavigationBar'
import { IUserActionsTypes, userLogoutAction } from '../actions/user'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    loginUser: state.user.user!,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  logout: payload => dispatch(userLogoutAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)
