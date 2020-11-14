import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './components/ChooseRole';
import { history } from '../../store/Store';
import { signInRequest } from './actions';
import { USER_DOES_NOT_HAVE_ACCOUNT } from '../../constants/errors';
import { USER_HOME } from '../../constants/links';

class PreHome extends Component {
  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(signInRequest());
    if (user) {
      history.push(USER_HOME);
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
    errors: state.messageReducers.errors
  };
};

export default connect(mapStateToProps)(PreHome);
