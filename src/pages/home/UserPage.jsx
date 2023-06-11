import {User} from './components/User';
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {useFetchLessonsByQueryParamsQuery} from "../../store/lesson/lessonApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function UserPage() {

  const {userId} = useParams();

  const {data: user} = useFetchUserQuery(userId ?? skipToken);
  const {data: lessons} = useFetchLessonsByQueryParamsQuery(userId ? {userId} : skipToken);

  return (
    <div>
      {user && (
        <User
          user={user}
          lessons={lessons}
          isMine={false}
        />
      )}
    </div>
  );
}
