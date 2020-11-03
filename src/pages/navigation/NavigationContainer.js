import { connect } from 'react-redux';
import { TopToolBar } from './TopToolBar';
import { signOut } from '../authorization/signIn/actions';
import { changeIsMenuOpen } from './actions';
import { AuthService } from '../../services/AuthService';

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isAuthenticated: state.authReducers.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  signOutFunc() {
    return () => {
      new AuthService().logout();
      dispatch(signOut());
    };
  },

  openMenu() {
    return () => {
      dispatch(changeIsMenuOpen());
    };
  }
});

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopToolBar);

export default NavigationContainer;
