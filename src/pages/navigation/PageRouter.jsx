import React, { Fragment } from 'react';
import {
  ADD_FILE,
  ADD_LESSON,
  ADMINS,
  DEBTS,
  FILES_PAGE,
  GROUP_PAGE_ROUTER,
  GROUP_SCHEDULE_ROUTER,
  LECTURE_HALLS,
  PRE_HOME,
  SCHEDULE,
  SETTING,
  SHARE_FILES,
  STUDENTS,
  STUDENTS_RATING,
  SUBJECT_SCORES,
  TEACHERS,
  USER_HOME,
  USER_HOME_PAGE_ROUTER,
  USER_SCHEDULE_ROUTER
} from '../../constants/links';
import PreHome from '../authorization/PreHome';
import { isAdmin, isStudent, isTeacher } from '../../utils/UsersUtil';
import UserHome from '../user/home/containers/UserHome';
import PageWithFiles from '../user/files/PageWithFiles';
import MySchedule from '../user/schedule/containers/MySchedule';
import TeachersList from '../user/userList/containers/TeachersList';
import AddFile from '../user/addFiles/AddFile';
import ShareFiles from '../user/shareFiles/ShareFiles';
import StudentsList from '../user/userList/containers/StudentsList';
import UniversityStructure from '../admin/structure/UniversityStructure';
import GroupSchedule from '../user/schedule/containers/GroupSchedule';
import LectureHalls from '../admin/lectureHalls/LectureHalls';
import { Container } from 'react-bootstrap';
import GroupPage from '../admin/groupPage/GroupPage';
import UserPage from '../user/home/containers/UserPage';
import UserSchedule from '../user/schedule/containers/UserSchedule';
import Setting from '../user/settings/Setting';
import AdminAddLesson from '../admin/addLesson/containers/AdminAddLesson';
import TeacherAddLesson from '../admin/addLesson/containers/TeacherAddLesson';
import StudentRating from '../studcabinet/StudentRating';
import SubjectsScores from '../studcabinet/SubjectsScores';
import Debts from '../studcabinet/Debts';
import AdminList from '../user/userList/containers/AdminList';
import { Route, Routes } from 'react-router';

export const PageRouter = ({ user }) => {
  return (
    <Container className={'main-page-container'}>
      <Routes>
      <Route exact path={PRE_HOME} element={<PreHome/>}/>

      {user && (
        <Fragment>
          {!isAdmin(user) && (
            <Fragment>
              <Route exact path={USER_HOME} element={<UserHome/>}/>
              <Route exact path={FILES_PAGE} element={<PageWithFiles/>}/>
              <Route exact path={SCHEDULE} element={<MySchedule/>}/>
            </Fragment>
          )}

          {isTeacher(user) && (
            <Fragment>
              <Route exact path={ADD_FILE} element={<AddFile/>}/>
              <Route exact path={SHARE_FILES} element={<ShareFiles/>}/>
              <Route exact path={ADD_LESSON} element={<TeacherAddLesson/>}/>
            </Fragment>
          )}

          {isStudent(user) && (
            <Fragment>
              <Route exact path={STUDENTS_RATING} element={<StudentRating/>}/>
              <Route exact path={SUBJECT_SCORES} element={<SubjectsScores/>}/>
              <Route exact path={DEBTS} element={<Debts/>}/>
            </Fragment>
          )}
          {isAdmin(user) && (
            <Fragment>
              <Route exact path={USER_HOME} element={<UniversityStructure/>}/>
              <Route exact path={ADD_LESSON} element={<AdminAddLesson/>}/>
              <Route exact path={SCHEDULE} element={<GroupSchedule/>}/>
              <Route exact path={LECTURE_HALLS} element={<LectureHalls/>}/>
              <Route exact path={GROUP_PAGE_ROUTER} element={<GroupPage/>}
              />
              <Route exact path={GROUP_SCHEDULE_ROUTER} element={<GroupSchedule/>}
              />
              <Route exact path={ADMINS} element={<AdminList/>}/>
            </Fragment>
          )}
          <Fragment>
            <Route path={USER_HOME_PAGE_ROUTER} element={<UserPage/>}
            />
            <Route path={USER_SCHEDULE_ROUTER} element={<UserSchedule/>}
            />
            <Route exact path={SETTING} element={<Setting/>}/>
            <Route exact path={STUDENTS} element={<StudentsList/>}/>
            <Route exact path={TEACHERS} element={<TeachersList/>}/>
          </Fragment>

        </Fragment>
      )}
      </Routes>
    </Container>
  );
};
