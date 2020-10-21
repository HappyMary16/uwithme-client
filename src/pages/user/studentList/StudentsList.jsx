import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadStudentsByTeacherId } from '../actions';
import { StudentListItem } from './StudentListItem';
import ListGroup from 'react-bootstrap/ListGroup';

class StudentsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadStudentsByTeacherId());
  }

  render() {
    const { teachers } = this.props;

    return (
      <ListGroup variant={'flush'}>
        {teachers &&
          teachers.map(teacher => (
            <StudentListItem key={teacher.id} student={teacher} />
          ))}
      </ListGroup>
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
