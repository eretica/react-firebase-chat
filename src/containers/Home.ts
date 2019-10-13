import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IDispatchProps, Home } from '../pages/Home'
import { IStore } from '../stores'
import { IUserActionsTypes, userLoginAction } from '../actions/user'
import { IMapStateToProps } from '../pages/Room'

const mapStateToProps = (state: IStore): IMapStateToProps => ({
  loginUser: state.user.user!,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  login: payload => dispatch(userLoginAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
