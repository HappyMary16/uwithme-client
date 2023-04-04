import {useDispatch, useSelector} from 'react-redux';
import {User} from '../components/User';
import React, {useEffect} from 'react';
import {findLessonsForUser} from '../../../../actions/scheduleActions';
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";

export default function UserPage() {

  const dispatch = useDispatch();

  const {userId} = useParams();

  const {data: user} = useFetchUserQuery(userId);
  const lessons = useSelector(state => state.scheduleReducers.otherUsersLessons);

  useEffect(() => {
    dispatch(findLessonsForUser(userId));
  }, [userId, dispatch])

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
