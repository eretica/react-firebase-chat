import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IDispatchProps, Home } from '../components/Home'
import { IStore } from '../stores'
import { IUserActionsTypes, userLoginAction } from '../actions/user'

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IStore, void, IUserActionsTypes>
): IDispatchProps => ({
  login: payload => dispatch(userLoginAction(payload)),
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
