import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScheduleTable } from '../components/ScheduleTable';
import { findUserById } from '../../../utils/UsersUtil';
import { findLessonsForUser } from '../../users/actions';
import Grid from '@material-ui/core/Grid';


class UserSchedule extends Component {
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
        {teacher && <ScheduleTable user={teacher} lessons={lessons} isMine={false}/>}
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

export default connect(mapStateToProps)(UserSchedule);
