import {useDispatch, useSelector} from "react-redux";
import {User} from "../components/User";
import {findLessons} from "../../../../actions/scheduleActions";
import React, {useEffect} from "react";
import {useFetchUserQuery} from "../../../../store/auth/authApiSlice";
import {uploadAvatar} from "../../../../services/avatarService";
import {addError} from "../../../../actions/messageAction";

export default function UserHome() {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;
  const lessons = useSelector(state => state.scheduleReducers.lessons);

  useEffect(() => {
    dispatch(findLessons());
  }, [dispatch]);

  return (
    user && (
      <User
        user={user}
        lessons={lessons}
        isMine={true}
        onSaveAvatar={avatar => uploadAvatar(avatar, (error) => dispatch(addError(error)))}
      />
    )
  );
}
