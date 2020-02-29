import { connect } from 'react-redux';
import { TopToolBar } from '../components/TopToolBar';
import { signOut } from '../../pages/authorization/actions';

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => ({
  signOutFunc() {
    return () => {
      dispatch(signOut());
    };
  }
});

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopToolBar);

export default NavigationContainer;
