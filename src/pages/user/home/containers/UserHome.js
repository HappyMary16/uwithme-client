import {useDispatch, useSelector} from "react-redux";
import {User} from "../components/User";
import {findLessons} from "../../../../actions/scheduleActions";
import React, {useEffect} from "react";
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";
import {getId} from "../../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";

export default function UserHome() {

  const dispatch = useDispatch();

  const user = useFetchUserQuery(getId() ?? skipToken).data;
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
      />
    )
  );
}
