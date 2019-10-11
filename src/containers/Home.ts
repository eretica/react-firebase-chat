import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IDispatchProps, IMapStateToProps, Home } from '../components/Home'
import { IRoomActionsTypes, roomEnterAction } from '../actions/room'
import { IStore } from '../stores'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    user: state.room,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IRoomActionsTypes>
): IDispatchProps => ({
  enter: payload => dispatch(roomEnterAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
