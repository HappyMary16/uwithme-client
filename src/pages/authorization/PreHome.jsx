import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './components/ChooseRole';
import { history } from '../../store/Store';
import { signInRequest } from './actions';
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
    const { isRegistrationComplete } = this.props;
    return (
      <div>{!isRegistrationComplete && <ChooseRole />}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isAuthenticated: state.authReducers.isAuthenticated,
    isRegistrationComplete: state.authReducers.isRegistrationComplete
  };
};

export default connect(mapStateToProps)(PreHome);
