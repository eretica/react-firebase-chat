import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IDispatchProps, IMapStateToProps, Room } from '../components/Room'
import { IUserActionsTypes, userLoginAction } from '../actions/user'
import { roomPostMessageAction, roomSetMessagesAction } from '../actions/room'

const mapStateToProps = (state: IStore): IMapStateToProps => ({
  loginUser: state.user.user!,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  postMessage: payload => dispatch(roomPostMessageAction(payload)),
  setMessage: payload => dispatch(roomSetMessagesAction(payload)),
  logout: payload => dispatch(userLoginAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)
