import { connect } from 'react-redux';
import { User } from '../components/User';
import React, { Component } from 'react';
import { findUserById } from '../../../../utils/UsersUtil';
import { findLessonsForUser } from '../../../../actions/scheduleActions';
import { withUserId } from '../../../../utils/RouterUtils';

class UserPage extends Component {
  componentDidMount() {
    const { dispatch, teachers, userId } = this.props;
    const teacher = findUserById(teachers, userId);
    if (teacher) {
      dispatch(findLessonsForUser(teacher.id));
    }
  }

  render() {
    const { teachers, userId, lessons } = this.props;
    const teacher = findUserById(teachers, userId);

    return (
      <div>
        {teacher && (
          <User
            user={teacher}
            avatar={teacher.avatar}
            lessons={lessons}
            isMine={false}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.userReducers.users,
    lessons: state.scheduleReducers.otherUsersLessons
  };
};

export default withUserId(connect(mapStateToProps)(UserPage));
