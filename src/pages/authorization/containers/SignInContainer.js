import { connect } from 'react-redux';
import { signInRequest } from '../actions/authActions';
import { SignIn } from '../components/SignIn';

const mapDispatchToProps = dispatch => ({
  signInRequestFunc() {
    return () => {
      dispatch(signInRequest());
    };
  }
});

const SingInContainer = connect(mapDispatchToProps)(SignIn);

export default SingInContainer;
