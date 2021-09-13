import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ADMIN } from '../../../../constants/userRoles';
import { getAdmins } from '../../../../utils/UsersUtil';
import { loadAdmins } from '../../../../actions/userActions';
import { UsersList } from '../components/UsersList';

class AdminsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadAdmins());
  }

  render() {
    const { admins, isFetching } = this.props;

    return (
      <UsersList users={admins} role={ADMIN} isFetching={isFetching} />
    );
  }
}

const mapStateToProps = state => {
  return {
    admins: getAdmins(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(AdminsList);
