import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findLessonsForUser} from '../../../../actions/scheduleActions';
import {Schedule} from '../components/Schedule';
import {useParams} from "react-router-dom";

export default function UserSchedule() {

  const dispatch = useDispatch();

  const {userId} = useParams();

  const user = useSelector(state => state.userReducers.users[userId]);
  const lessons = useSelector(state => state.scheduleReducers.otherUsersLessons);


  useEffect(() => {
    dispatch(findLessonsForUser(userId));
  }, [userId, dispatch])

  return (
    user && <Schedule user={user} lessons={lessons}/>
  );
}
