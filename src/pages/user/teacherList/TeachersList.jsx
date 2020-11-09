import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadTeachersByGroupId } from '../actions';
import { TeacherListItem } from './TeacherListItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { EmptyPage } from '../../common/components/EmptyPage';

class TeachersList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadTeachersByGroupId());
  }

  render() {
    const { teachers, isFetching } = this.props;

    return (
      <ListGroup variant={'flush'}>
        <EmptyPage list={teachers} isFetching={isFetching} />
        {teachers &&
          teachers.map(teacher => (
            <TeacherListItem key={teacher.id} teacher={teacher} />
          ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    teachers: state.usersReducer.users,
    isFetching: state.loadingProcess.isFetching
  };
};

export default connect(mapStateToProps)(TeachersList);
