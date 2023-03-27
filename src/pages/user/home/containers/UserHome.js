import {useDispatch, useSelector} from "react-redux";
import {User} from "../components/User";
import {findLessons} from "../../../../actions/scheduleActions";
import React, {useEffect} from "react";
import {uploadAvatar} from "../../../../actions/userActions";
import {useFetchUserQuery} from "../../../../store/slices/authApiSlice";

export default function UserHome() {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;
  const avatar = useSelector(state => state.authReducers.avatar);
  const lessons = useSelector(state => state.scheduleReducers.lessons);

  useEffect(() => {
    dispatch(findLessons());
  }, [dispatch])

  function onSaveAvatar(avatar) {
    const {dispatch} = this.props;
    dispatch(uploadAvatar(avatar));
  }

  return (
    user && (
      <User
        user={user}
        avatar={avatar}
        lessons={lessons}
        isMine={true}
        onSaveAvatar={onSaveAvatar}
      />
    )
  );
}
