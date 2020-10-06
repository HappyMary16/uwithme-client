import { connect } from 'react-redux';
import { TopToolBar } from '../components/TopToolBar';
import { signOut } from '../../pages/authorization/actions';
import { changeIsMenuOpen } from '../actions';

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
