import { connect } from "react-redux";
import { User } from "../components/User";
import { findLessons } from "../../../../actions/scheduleActions";
import React, { Component } from "react";
import { uploadAvatar } from "../../../../actions/userActions";
import { signInRequest } from "../../../../actions/authActions";

class UserHome extends Component {
  constructor(props) {
    super(props);

    this.onSaveAvatar = this.onSaveAvatar.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(signInRequest());
    dispatch(findLessons());
  }

  onSaveAvatar(avatar) {
    const { dispatch } = this.props;
    dispatch(uploadAvatar(avatar));
  }

  render() {
    const { user, avatar, lessons } = this.props;

    return (
      <User
        user={user}
        avatar={avatar}
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
    avatar: state.authReducers.avatar,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(UserHome);
