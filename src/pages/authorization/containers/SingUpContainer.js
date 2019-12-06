import { connect } from 'react-redux';
import { SignUp } from '../components/SignUp';
import { signUpRequest } from '../actions/authActions';

const mapStateToProps = state => {
  return {
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups
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
