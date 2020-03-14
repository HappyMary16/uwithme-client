import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByGroupId } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';


class GroupSchedule extends Component {
  componentDidMount() {
    const { dispatch, groupId } = this.props;
    dispatch(findLessonsByGroupId(groupId));
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
    //TODO fix it
    groupId: 1,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(GroupSchedule);
