import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StudentListItem } from './StudentListItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { EmptyPage } from '../../common/components/EmptyPage';
import { loadStudents } from '../../../actions/userActions';
import { getStudents } from '../../../utils/UsersUtil';

class StudentsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadStudents());
  }

  render() {
    const { students, isFetching } = this.props;

    return (
      <ListGroup variant={'flush'}>
        <EmptyPage list={students} isFetching={isFetching}/>
        {students &&
        students.map(student => (
          <StudentListItem key={student.id} student={student}/>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    students: getStudents(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(StudentsList);
