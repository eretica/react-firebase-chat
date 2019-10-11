import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IDispatchProps, IMapStateToProps, Room } from '../components/Room'
import { IUserActionsTypes, userLoginAction } from '../actions/user'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  logout: payload => dispatch(userLoginAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)
