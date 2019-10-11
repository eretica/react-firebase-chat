import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IStore } from '../stores'
import { IDispatchProps, IMapStateToProps, Room } from '../components/Room'
import { IRoomActionsTypes, roomLeaveAction } from '../actions/room'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    user: state.room,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IRoomActionsTypes>
): IDispatchProps => ({
  leave: payload => dispatch(roomLeaveAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)
