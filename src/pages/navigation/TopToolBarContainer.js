import { connect } from "react-redux";
import { TopToolBar } from "./components/TopToolBar";
import { changeIsMenuOpen } from "../../actions/navigationActions";
import { authService } from "../../services/http";
import { signOut } from "../../actions/authActions";

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
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
