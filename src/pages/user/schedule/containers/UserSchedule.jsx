import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findLessonsForUser} from '../../../../actions/scheduleActions';
import {Schedule} from '../components/Schedule';
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";

export default function UserSchedule() {

  const dispatch = useDispatch();

  const {userId} = useParams();

  const {data: user} = useFetchUserQuery(userId);
  const lessons = useSelector(state => state.scheduleReducers.otherUsersLessons);


  useEffect(() => {
    dispatch(findLessonsForUser(userId));
  }, [userId, dispatch])

  return (
    user && <Schedule user={user} lessons={lessons}/>
  );
}
