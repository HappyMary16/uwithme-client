import { connect } from 'react-redux';
import { TopToolBar } from './TopToolBar';
import { signOut } from '../authorization/signIn/actions';
import { changeIsMenuOpen } from './actions';

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
