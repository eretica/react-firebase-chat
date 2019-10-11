import { connect } from 'react-redux'
import { IStore } from '../stores'
import { IMapStateToProps, Auth } from '../components/Auth'

const mapStateToProps = (state: IStore): IMapStateToProps => {
  return {
    loginUser: state.user.user!,
  }
}

export default connect(
  mapStateToProps,
  {}
)(Auth)
