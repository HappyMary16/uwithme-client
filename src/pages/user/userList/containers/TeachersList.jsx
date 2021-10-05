import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadStudents, loadTeachers, loadUsersByRole } from '../../../../actions/userActions';
import { getTeachers } from '../../../../utils/UsersUtil';
import { UsersList } from '../components/UsersList';
import { STUDENT, TEACHER } from '../../../../constants/userRoles';

class TeachersList extends Component {
  componentDidMount() {
    const { dispatch, activeRole } = this.props;
    if (activeRole === STUDENT) {
      dispatch(loadTeachers());
    } else {
      dispatch(loadUsersByRole(TEACHER));
    }
  }

  render() {
    const { teachers, isFetching } = this.props;

    return (
      <UsersList users={teachers} isFetching={isFetching} />
    );
  }
}

const mapStateToProps = state => {
  return {
    activeRole: state.authReducers.user.activeRole,
    teachers: getTeachers(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(TeachersList);
