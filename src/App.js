import React, { Component } from 'react';
import { Route, useParams } from 'react-router-dom';

import NavigationContainer from './pages/navigation/NavigationContainer';
import {
  ADD_FILE,
  ADD_LESSON,
  ADD_UNIVERSITY_PATH,
  FILES,
  GROUP_PAGE_ROUTER,
  GROUP_SCHEDULE_ROUTER,
  LECTURE_HALLS,
  SCHEDULE,
  SHARE_FILES,
  SIGN_IN,
  SIGN_UP,
  STUDENTS,
  TEACHERS,
  USER_HOME,
  USER_HOME_PAGE_ROUTER,
  USER_SCHEDULE_ROUTER
} from './constants/links';
import { UserToolBar } from './pages/user/UserToolBar';

import AddFile from './pages/user/addFiles/AddFile';
import { connect } from 'react-redux';
import ShareFiles from './pages/user/shareFiles/ShareFiles';
import PageWithFiles from './pages/user/files/PageWithFiles';
import SignUp from './pages/authorization/signUp/SignUp';
import SignIn from './pages/authorization/signIn/SignIn';
import AddUniversity from './pages/authorization/addUniversity/AddUniversity';
import { isAdmin, isStudent, isTeacher } from './utils/UsersUtil';
import { AdminToolBar } from './pages/admin/AdminToolBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import UniversityStructure from './pages/admin/structure/UniversityStructure';
import AddLesson from './pages/admin/addLesson/AddLesson';
import MySchedule from './pages/user/schedule/containers/MySchedule';
import GroupSchedule from './pages/user/schedule/containers/GroupSchedule';
import UserHome from './pages/user/home/containers/UserHome';
import LectureHalls from './pages/admin/lectureHalls/LectureHalls';
import TeachersList from './pages/user/teacherList/TeachersList';
import UserPage from './pages/user/home/containers/UserPage';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import UserSchedule from './pages/user/schedule/containers/UserSchedule';
import StudentsList from './pages/user/studentList/StudentsList';
import GroupPage from './pages/admin/groupPage/GroupPage';
import './styles/button.css';
import './styles/listItem.css';
import './styles/spases.css';
import './styles/menu.css';
import './styles/inputField.css';
import './styles/styles.css';
import Container from 'react-bootstrap/Container';

const useStyles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

function OpenGroupPage() {
  const { groupId } = useParams();
  return <GroupPage groupId={groupId}/>;
}

function OpenUserPage() {
  const { userId } = useParams();
  return <UserPage teacherId={userId}/>;
}

function OpenUserSchedule() {
  const { userId } = useParams();
  return <UserSchedule userId={userId}/>;
}

function OpenGroupSchedule() {
  const { groupId } = useParams();
  return <GroupSchedule groupId={groupId}/>;
}

class App extends Component {
  render() {
    const { user, isFetching, isMenuOpen, classes } = this.props;

    return (
      <div>
        <NavigationContainer/>
        <Backdrop className={classes.backdrop} open={isFetching !== 0}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        {user && !isAdmin(user) && (
          <UserToolBar user={user} isOpen={isMenuOpen}/>
        )}
        {isAdmin(user) && <AdminToolBar isOpen={isMenuOpen}/>}

        <Container className={'main-page-container'}>
          {!user && (
            <div>
              <Route
                exact
                path={ADD_UNIVERSITY_PATH}
                component={AddUniversity}
              />
              <Route exact path={SIGN_UP} component={SignUp}/>
              <Route exact path={SIGN_IN} component={SignIn}/>
            </div>
          )}

          {user && (
            <div>
              {!isAdmin(user) && (
                <div>
                  <Route exact path={USER_HOME} component={UserHome}/>
                  <Route exact path={FILES} component={PageWithFiles}/>
                  <Route exact path={SCHEDULE} component={MySchedule}/>
                </div>
              )}

              {isStudent(user) && (
                <div>
                  <Route exact path={TEACHERS} component={TeachersList}/>
                </div>
              )}

              {isTeacher(user) && (
                <div>
                  <Route exact path={ADD_FILE} component={AddFile}/>
                  <Route exact path={SHARE_FILES} component={ShareFiles}/>
                  <Route exact path={STUDENTS} component={StudentsList}/>
                </div>
              )}

              {isAdmin(user) && (
                <div>
                  <Route
                    exact
                    path={USER_HOME}
                    component={UniversityStructure}
                  />
                  <Route exact path={ADD_LESSON} component={AddLesson}/>
                  <Route exact path={SCHEDULE} component={GroupSchedule}/>
                  <Route exact path={LECTURE_HALLS} component={LectureHalls}/>
                  <Route exact path={GROUP_PAGE_ROUTER}>
                    <OpenGroupPage/>
                  </Route>
                  <Route exact path={GROUP_SCHEDULE_ROUTER}>
                    <OpenGroupSchedule/>
                  </Route>
                </div>
              )}
              <div>
                <Route path={USER_HOME_PAGE_ROUTER}>
                  <OpenUserPage/>
                </Route>
                <Route path={USER_SCHEDULE_ROUTER}>
                  <OpenUserSchedule/>
                </Route>
              </div>
              <div/>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isFetching: state.loadingProcess.isFetching,
    isMenuOpen: state.loadingProcess.isMenuOpen
  };
};

export default compose(withStyles(useStyles), connect(mapStateToProps))(App);
