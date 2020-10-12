import { connect } from 'react-redux';
import { User } from '../components/User';
import { findLessons } from '../../schedule/actions';
import React, { Component } from 'react';
import { uploadAvatar } from '../../actions';

class UserHome extends Component {
  constructor(props) {
    super(props);

    this.onSaveAvatar = this.onSaveAvatar.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findLessons());
  }

  onSaveAvatar(avatar) {
    const { dispatch } = this.props;
    dispatch(uploadAvatar(avatar));
  }

  render() {
    const { user, lessons } = this.props;

    return (
      <User
        user={user}
        lessons={lessons}
        isMine={true}
        onSaveAvatar={this.onSaveAvatar}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(UserHome);
