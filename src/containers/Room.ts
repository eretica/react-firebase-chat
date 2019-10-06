import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IDispatchProps, IMapStateToProps, Room } from '../components/Room'
import { IUserActionsTypes } from '../reducers/user'
import { userLeaveAction } from '../actions/user'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  leave: payload => dispatch(userLeaveAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)
