import {User} from "../components/User";
import React from "react";
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";
import {getId} from "../../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchLessonsQuery} from "../../../../store/lesson/lessonApiSlice";

export default function UserHome() {

  const {data: user} = useFetchUserQuery(getId() ?? skipToken);
  const {data: lessons} = useFetchLessonsQuery(getId() ?? skipToken);

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
