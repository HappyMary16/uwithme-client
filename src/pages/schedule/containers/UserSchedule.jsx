import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByUsername } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';


class UserSchedule extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(findLessonsByUsername(user.username));
  }

  render() {
    const { lessons, user } = this.props;

    return (
      <ScheduleTable lessons={lessons} user={user}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(UserSchedule);
