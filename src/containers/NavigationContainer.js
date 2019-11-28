import { connect } from 'react-redux';
import TopToolBar from '../components/TopToolBar';
import { signOut } from '../pages/authorization/actions/authActions';

const mapStateToProps = state => {
  return {
    user: state.user
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
