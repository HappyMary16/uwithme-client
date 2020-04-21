import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadStudentsByTeacherId } from '../actions';
import List from '@material-ui/core/List';
import { StudentListItem } from '../components/StudentListItem';

class StudentsList extends Component {

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(loadStudentsByTeacherId(user.id));
  }

  render() {
    const { teachers } = this.props;

    return (
      <List>
        {teachers && teachers.map(teacher => <StudentListItem key={teacher.id} student={teacher}/>)}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    teachers: state.usersReducer.users
  };
};

export default connect(mapStateToProps)(StudentsList);