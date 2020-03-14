import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByUserId } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';


class UserSchedule extends Component {
  componentDidMount() {
    const { dispatch, userId } = this.props;

    dispatch(findLessonsByUserId(userId));
  }

  render() {
    const { lessons } = this.props;

    return (
      <ScheduleTable lessons={lessons}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducers.user.id,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(UserSchedule);
