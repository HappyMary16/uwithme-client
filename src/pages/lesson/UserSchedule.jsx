import {Schedule} from './component/Schedule';
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchLessonsByQueryParamsQuery} from "../../store/lesson/lessonApiSlice";

export default function UserSchedule() {

  const {userId} = useParams();

  const {data: user} = useFetchUserQuery(userId ?? skipToken);
  const {data: lessons} = useFetchLessonsByQueryParamsQuery(userId ? {userId} : skipToken);

  return (
    user && <Schedule user={user} lessons={lessons}/>
  );
}
