import { connect } from 'react-redux';
import { SignUp } from '../components/SignUp';
import { signUpRequest } from '../actions/authActions';

const mapStateToProps = state => {
  return {
    institutes: state.info.institutes,
    departments: state.info.departments,
    groups: state.info.groups
  };
};

const mapDispatchToProps = dispatch => ({
  signUpRequestFunc() {
    return () => {
      dispatch(signUpRequest());
    };
  }
});

const SingUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SingUpContainer;
