import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './components/ChooseRole';
import { history } from '../../store/Store';
import { signInRequest } from './signIn/actions';
import { USER_DOES_NOT_HAVE_ACCOUNT } from '../../constants/errors';

class PreHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(signInRequest());
    if (user) {
      history.push('/home');
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div>{errors.includes(USER_DOES_NOT_HAVE_ACCOUNT) && <ChooseRole />}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isAuthenticated: state.authReducers.isAuthenticated,
    errors: state.loadingProcess.errors
  };
};

export default connect(mapStateToProps)(PreHome);
