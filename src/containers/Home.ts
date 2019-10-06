import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IDispatchProps, IMapStateToProps, Home } from '../components/Home'
import { IUserActionsTypes } from '../reducers/user'
import { userEnterAction } from '../actions/user'
import { IStore } from '../stores'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  enter: payload => dispatch(userEnterAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
