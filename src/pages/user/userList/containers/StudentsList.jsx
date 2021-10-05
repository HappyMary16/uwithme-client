import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadStudents, loadUsersByRole } from '../../../../actions/userActions';
import { getStudents } from '../../../../utils/UsersUtil';
import { UsersList } from '../components/UsersList';
import { STUDENT, TEACHER } from '../../../../constants/userRoles';

class StudentsList extends Component {
  componentDidMount() {
    const { dispatch, activeRole } = this.props;
    if (activeRole === TEACHER) {
      dispatch(loadStudents());
    } else {
      dispatch(loadUsersByRole(STUDENT));
    }
  }

  render() {
    const { students, isFetching } = this.props;

    return (
      <UsersList users={students} isFetching={isFetching} />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeRole: state.authReducers.user.activeRole,
    students: getStudents(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(StudentsList);
