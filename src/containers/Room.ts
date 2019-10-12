import { connect } from 'react-redux'
import { IStore } from '../stores'
import { IMapStateToProps, Room } from '../components/Room'

const mapStateToProps = (state: IStore): IMapStateToProps => ({
  loginUser: state.user.user!,
})

export default connect(
  mapStateToProps,
  {}
)(Room)
