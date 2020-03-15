import { connect } from 'react-redux';
import { User } from '../components/User';
import { findLessonsByUsername } from '../../schedule/actions';
import React, { Component } from 'react';

class UserContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(findLessonsByUsername(user.username));
  }

  render() {
    const { user, lessons } = this.props;

    return (
      <User user={user} lessons={lessons}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(UserContainer);