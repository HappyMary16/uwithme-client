import { connect } from "react-redux";
import { TopToolBar } from "./components/TopToolBar";
import { changeIsMenuOpen } from "../../actions/navigationActions";
import { authService } from "../../services/http";
import { signOut } from "../../actions/authActions";
import { updateActiveRole } from '../../actions/userActions';
import { history } from '../../store/Store';
import { USER_HOME } from '../../constants/links';

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    avatar: state.authReducers.avatar
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
  },

  updateUserRoleFunc(role) {
    return () => {
      dispatch(updateActiveRole(role));
      history.push(USER_HOME);
    }
  }
});

const TopToolBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopToolBar);

export default TopToolBarContainer;
