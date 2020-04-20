import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScheduleTable } from '../components/ScheduleTable';
import { findLessonsByUsername } from '../actions';


class MySchedule extends Component {

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(findLessonsByUsername(user.username));
  }

  render() {
    const { lessons, user } = this.props;

    return (
      <ScheduleTable lessons={lessons} user={user} isMine={true}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(MySchedule);
