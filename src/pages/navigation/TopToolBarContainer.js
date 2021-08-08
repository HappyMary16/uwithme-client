import { connect } from 'react-redux';
import { TopToolBar } from './components/TopToolBar';
import { signOut } from '../authorization/actions';
import { changeIsMenuOpen } from './actions';
import { authService } from '../../services/http';

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isAuthenticated: state.authReducers.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  signOutFunc() {
    return () => {
      authService.logout();
      dispatch(signOut());
    };
  },

  openMenu() {
    return () => {
      dispatch(changeIsMenuOpen());
    };
  }
});

const TopToolBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopToolBar);

export default TopToolBarContainer;
