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
    const { teachers } = this.props;

    return (
      <ListGroup variant={'flush'}>
        {(!teachers || teachers.length === 0) && <EmptyPage />}
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
    teachers: state.usersReducer.users
  };
};

export default connect(mapStateToProps)(TeachersList);
