import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessons } from '../../../../actions/scheduleActions';
import { Schedule } from '../components/Schedule';

class MySchedule extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findLessons());
  }

  render() {
    const { lessons, user } = this.props;

    return <Schedule lessons={lessons} user={user} isMine/>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(MySchedule);
