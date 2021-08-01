import React from 'react';
import { Route, useParams } from 'react-router-dom';
import {
  ADD_FILE,
  ADD_LESSON,
  FILES,
  GROUP_PAGE_ROUTER,
  GROUP_SCHEDULE_ROUTER,
  LECTURE_HALLS,
  PRE_HOME,
  SCHEDULE,
  SETTING,
  SHARE_FILES,
  STUDENTS,
  STUDENTS_RATING,
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
import TeachersList from '../user/teacherList/TeachersList';
import AddFile from '../user/addFiles/AddFile';
import ShareFiles from '../user/shareFiles/ShareFiles';
import StudentsList from '../user/studentList/StudentsList';
import UniversityStructure from '../admin/structure/UniversityStructure';
import GroupSchedule from '../user/schedule/containers/GroupSchedule';
import LectureHalls from '../admin/lectureHalls/LectureHalls';
import Container from 'react-bootstrap/Container';
import GroupPage from '../admin/groupPage/GroupPage';
import UserPage from '../user/home/containers/UserPage';
import UserSchedule from '../user/schedule/containers/UserSchedule';
import Setting from '../user/settings/Setting';
import AdminAddLesson from '../admin/addLesson/containers/AdminAddLesson';
import TeacherAddLesson from '../admin/addLesson/containers/TeacherAddLesson';
import StudentRating from '../studcabinet/StudentRating';

function OpenGroupPage() {
  const { groupId } = useParams();
  return <GroupPage groupId={groupId} />;
}

function OpenUserPage() {
  const { userId } = useParams();
  return <UserPage teacherId={userId} />;
}

function OpenUserSchedule() {
  const { userId } = useParams();
  return <UserSchedule userId={userId} />;
}

function OpenGroupSchedule() {
  const { groupId } = useParams();
  return <GroupSchedule groupId={groupId} />;
}

export const PageRouter = ({ user }) => {
  return (
    <Container className={'main-page-container'}>
      <Route exact path={PRE_HOME} component={PreHome} />

      {user && (
        <div>
          {!isAdmin(user) && (
            <div>
              <Route exact path={USER_HOME} component={UserHome} />
              <Route exact path={FILES} component={PageWithFiles} />
              <Route exact path={SCHEDULE} component={MySchedule} />
            </div>
          )}

          {isTeacher(user) && (
            <div>
              <Route exact path={ADD_FILE} component={AddFile} />
              <Route exact path={SHARE_FILES} component={ShareFiles} />
              <Route exact path={ADD_LESSON} component={TeacherAddLesson} />
            </div>
          )}

          {isStudent(user) && (
            <div>
              <Route exact path={STUDENTS_RATING} component={StudentRating} />
            </div>
          )}
          {isAdmin(user) && (
            <div>
              <Route exact path={USER_HOME} component={UniversityStructure} />
              <Route exact path={ADD_LESSON} component={AdminAddLesson} />
              <Route exact path={SCHEDULE} component={GroupSchedule} />
              <Route exact path={LECTURE_HALLS} component={LectureHalls} />
              <Route exact path={GROUP_PAGE_ROUTER}>
                <OpenGroupPage />
              </Route>
              <Route exact path={GROUP_SCHEDULE_ROUTER}>
                <OpenGroupSchedule />
              </Route>
            </div>
          )}
          <div>
            <Route path={USER_HOME_PAGE_ROUTER}>
              <OpenUserPage />
            </Route>
            <Route path={USER_SCHEDULE_ROUTER}>
              <OpenUserSchedule />
            </Route>
            <Route exact path={SETTING} component={Setting} />
            <Route exact path={STUDENTS} component={StudentsList} />
            <Route exact path={TEACHERS} component={TeachersList} />
          </div>
          <div />
        </div>
      )}
    </Container>
  );
};
