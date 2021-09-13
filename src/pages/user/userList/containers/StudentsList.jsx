import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadStudents } from '../../../../actions/userActions';
import { getStudents } from '../../../../utils/UsersUtil';
import { UsersList } from '../components/UsersList';
import { STUDENT } from '../../../../constants/userRoles';

class StudentsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadStudents());
  }

  render() {
    const { students, isFetching } = this.props;

    return (
      <UsersList users={students} role={STUDENT} isFetching={isFetching} />
    );
  }
}

const mapStateToProps = state => {
  return {
    students: getStudents(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(StudentsList);
