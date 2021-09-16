import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadTeachers } from '../../../../actions/userActions';
import { getTeachers } from '../../../../utils/UsersUtil';
import { UsersList } from '../components/UsersList';

class TeachersList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadTeachers());
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
    teachers: getTeachers(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(TeachersList);
