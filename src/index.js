import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import '../src/locales/i18n';
import App from './App';
import {store} from './store/Store';
import {CustomSpinner} from "./pages/navigation/components/CustomSpinner";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {PageRouter} from "./pages/navigation/PageRouter";
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
  USER_HOME_PAGE_ROUTER,
  USER_SCHEDULE_ROUTER
} from "./constants/links";
import PreHome from "./pages/authorization/PreHome";
import Home from "./pages/common/containers/Home";
import UserPage from "./pages/user/home/containers/UserPage";
import UserSchedule from "./pages/user/schedule/containers/UserSchedule";
import Setting from "./pages/user/settings/Setting";
import StudentsList from "./pages/user/userList/containers/StudentsList";
import TeachersList from "./pages/user/userList/containers/TeachersList";
import PageWithFiles from "./pages/user/files/PageWithFiles";
import {ADMIN, STUDENT, TEACHER} from "./constants/userRoles";
import GroupSchedule from "./pages/user/schedule/containers/GroupSchedule";
import AdminList from "./pages/user/userList/containers/AdminList";
import GroupPage from "./pages/admin/groupPage/GroupPage";
import LectureHalls from "./pages/admin/lectureHalls/LectureHalls";
import AdminAddLesson from "./pages/admin/addLesson/containers/AdminAddLesson";
import Debts from "./pages/studcabinet/Debts";
import SubjectsScores from "./pages/studcabinet/SubjectsScores";
import StudentRating from "./pages/studcabinet/StudentRating";
import TeacherAddLesson from "./pages/admin/addLesson/containers/TeacherAddLesson";
import ShareFiles from "./pages/user/shareFiles/ShareFiles";
import AddFile from "./pages/user/addFiles/AddFile";
import MySchedule from "./pages/user/schedule/containers/MySchedule";
import {authService, hasAnyRole} from "./services/authService";

// const Begin = lazy(() => import("./components/session/Begin"));
// const Test = lazy(() => import("./components/test/Test"));
// const Question = lazy(() => import("./components/test/Question"));
// const Result = lazy(() => import("./components/test/Result"));
// const Session = lazy(() => import("./components/session/Session"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: PRE_HOME,
        element: <PreHome/>
      },
      {
        path: USER_HOME_PAGE_ROUTER,
        element: <UserPage/>
      },
      {
        path: USER_SCHEDULE_ROUTER,
        element: <UserSchedule/>
      },
      {
        path: SETTING,
        element: <Setting/>
      },
      {
        path: STUDENTS,
        element: <StudentsList/>
      },
      {
        path: TEACHERS,
        element: <TeachersList/>
      },
      {
        path: FILES_PAGE,
        element:
          <PageRouter roles={[STUDENT, TEACHER]}>
            <PageWithFiles/>
          </PageRouter>
      },
      {
        path: SCHEDULE,
        element:
          <PageRouter roles={[STUDENT, TEACHER, ADMIN]}>
            {hasAnyRole([STUDENT, TEACHER]) ? <MySchedule/> : <GroupSchedule/>}
          </PageRouter>
      },
      {
        path: ADD_FILE,
        element:
          <PageRouter roles={[TEACHER]}>
            <AddFile/>
          </PageRouter>
      },
      {
        path: SHARE_FILES,
        element:
          <PageRouter roles={[TEACHER]}>
            <ShareFiles/>
          </PageRouter>
      },
      {
        path: ADD_LESSON,
        element:
          <PageRouter roles={[TEACHER, ADMIN]}>
            {hasAnyRole([TEACHER]) ? <TeacherAddLesson/> : <AdminAddLesson/>}
          </PageRouter>
      },
      {
        path: STUDENTS_RATING,
        element:
          <PageRouter roles={[STUDENT]}>
            <StudentRating/>
          </PageRouter>
      },
      {
        path: SUBJECT_SCORES,
        element:
          <PageRouter roles={[STUDENT]}>
            <SubjectsScores/>
          </PageRouter>
      },
      {
        path: DEBTS,
        element:
          <PageRouter roles={[STUDENT]}>
            <Debts/>
          </PageRouter>
      },
      {
        path: LECTURE_HALLS,
        element:
          <PageRouter roles={[ADMIN]}>
            <LectureHalls/>
          </PageRouter>
      },
      {
        path: GROUP_PAGE_ROUTER,
        element:
          <PageRouter roles={[ADMIN]}>
            <GroupPage/>
          </PageRouter>
      },
      {
        path: GROUP_SCHEDULE_ROUTER,
        element:
          <PageRouter roles={[ADMIN]}>
            <GroupSchedule/>
          </PageRouter>
      },
      {
        path: ADMINS,
        element:
          <PageRouter roles={[ADMIN]}>
            <AdminList/>
          </PageRouter>
      }
    ]
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {authService.isLoggedIn() &&
      <Provider store={store}>
        <Suspense fallback={<CustomSpinner isFetching/>}>
          <RouterProvider router={router}/>
        </Suspense>
      </Provider>
    }
  </React.StrictMode>
);
