import { connect } from 'react-redux';
import { User } from '../components/User';
import React, { Component } from 'react';
import { findUserById } from '../../../../utils/UsersUtil';
import { findLessonsForUser } from '../../../../actions/scheduleActions';

class UserPage extends Component {
  componentDidMount() {
    const { dispatch, teachers, teacherId } = this.props;
    const teacher = findUserById(teachers, teacherId);
    if (teacher) {
      dispatch(findLessonsForUser(teacher.id));
    }
  }

  render() {
    const { teachers, teacherId, lessons } = this.props;
    const teacher = findUserById(teachers, teacherId);

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

export default connect(mapStateToProps)(UserPage);
