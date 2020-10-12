import { connect } from 'react-redux';
import { User } from '../components/User';
import React, { Component } from 'react';
import { findUserById } from '../../../../utils/UsersUtil';
import Grid from '@material-ui/core/Grid';
import { findLessonsForUser } from '../../actions';

class UserPage extends Component {

  componentDidMount() {
    const { dispatch, teachers, teacherId } = this.props;
    const teacher = findUserById(teachers, teacherId);
    if (teacher) {
      dispatch(findLessonsForUser(teacher.username));
    }
  }

  render() {
    const { teachers, teacherId, lessons } = this.props;
    const teacher = findUserById(teachers, teacherId);

    return (
      <Grid>
        {teacher && <User user={teacher} lessons={lessons} isMine={false}/>}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.usersReducer.users,
    lessons: state.usersReducer.lessons
  };
};

export default connect(mapStateToProps)(UserPage);