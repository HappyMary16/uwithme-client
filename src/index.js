import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import '../src/locales/i18n';
import App from './App';
import {store} from './store/Store';
import {CustomSpinner} from "./pages/common/CustomSpinner";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {PageRouter} from "./pages/navigation/PageRouter";
import {register} from "register-service-worker"
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
import Home from "./pages/home/Home";
import UserPage from "./pages/home/UserPage";
import UserSchedule from "./pages/lesson/UserSchedule";
import Setting from "./pages/settings/Setting";
import StudentsList from "./pages/userList/StudentsList";
import TeachersList from "./pages/userList/TeachersList";
import PageWithFiles from "./pages/file/PageWithFiles";
import {ADMIN, STUDENT, TEACHER} from "./constants/userRoles";
import GroupSchedule from "./pages/lesson/GroupSchedule";
import AdminList from "./pages/userList/AdminList";
import GroupPage from "./pages/group/GroupPage";
import LectureHalls from "./pages/lectureHalls/LectureHalls";
import Debts from "./pages/studcabinet/Debts";
import SubjectsScores from "./pages/studcabinet/SubjectsScores";
import StudentRating from "./pages/studcabinet/StudentRating";
import ShareFiles from "./pages/file/ShareFiles";
import AddFile from "./pages/file/AddFile";
import MySchedule from "./pages/lesson/MySchedule";
import {authService, hasAnyRole} from "./services/authService";
import AddLesson from "./pages/lesson/AddLesson";

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
            <AddLesson/>
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

register(`${process.env.PUBLIC_URL}/service-worker.js`);