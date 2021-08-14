import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUserById } from '../../../../utils/UsersUtil';
import { findLessonsForUser } from '../../../../actions/scheduleActions';
import { Schedule } from '../components/Schedule';

class UserSchedule extends Component {
  componentDidMount() {
    const { dispatch, users, userId } = this.props;
    const user = findUserById(users, userId);
    if (user) {
      dispatch(findLessonsForUser(user.id));
    }
  }

  render() {
    const { users, userId, lessons } = this.props;
    const user = findUserById(users, userId);

    return (
      user && <Schedule user={user} lessons={lessons}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducers.users,
    lessons: state.scheduleReducers.otherUsersLessons
  };
};

export default connect(mapStateToProps)(UserSchedule);
