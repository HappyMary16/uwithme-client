import React, { Component } from 'react';
import { Route, useParams } from 'react-router-dom';

import NavigationContainer from './common/containers/NavigationContainer';
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
import { UserToolBar } from './pages/users/components/UserToolBar';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddFile from './pages/files/add/containers/AddFile';
import { connect } from 'react-redux';
import ShareFiles from './pages/files/share/containers/ShareFiles';
import PageWithFiles from './pages/files/view/containers/PageWithFiles';
import { Copyright } from './common/components/Copyright';
import SignUp from './pages/authorization/containers/SignUp';
import SignIn from './pages/authorization/containers/SignIn';
import AddUniversity from './pages/authorization/containers/AddUniversity';
import { isAdmin, isStudent, isTeacher } from './utils/UsersUtil';
import { AdminToolBar } from './pages/administration/structure/components/AdminToolBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import UniversityStructure from './pages/administration/structure/containers/UniversityStructure';
import AddLesson from './pages/schedule/containers/AddLesson';
import MySchedule from './pages/schedule/containers/MySchedule';
import GroupSchedule from './pages/schedule/containers/GroupSchedule';
import UserHome from './pages/users/containers/UserHome';
import LectureHalls from './pages/administration/lectureHalls/containers/LectureHalls';
import TeachersList from './pages/users/containers/TeachersList';
import UserPage from './pages/users/containers/UserPage';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import UserSchedule from './pages/schedule/containers/UserSchedule';
import StudentsList from './pages/users/containers/StudentsList';
import GroupPage from './pages/groups/containers/GroupPage';

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
  const { teacherId } = useParams();
  return <UserSchedule teacherId={teacherId}/>;
}

function OpenGroupSchedule() {
  const { groupId } = useParams();
  return <GroupSchedule groupId={groupId}/>;
}

class App extends Component {

  render() {
    const { user, isFetching, classes } = this.props;

    return (
      <Container style={{ height: '100vh' }}>
        <Backdrop className={classes.backdrop} open={isFetching !== 0}>
          <CircularProgress color='inherit'/>
        </Backdrop>

        <Grid
          container
          xs={12}
          alignContent='space-between'
          style={{ height: '100%' }}
        >
          <Grid container xs={12} alignContent={'flex-start'}>
            <Grid item xs={12}>
              <NavigationContainer/>
            </Grid>

            <Grid container xs={12}>
              <Route exact path={SIGN_IN} component={SignIn}/>
            </Grid>

            {!user && (
              <Grid container xs={12}>
                <Route exact path={ADD_UNIVERSITY_PATH}
                       component={AddUniversity}
                />
                <Route exact path={SIGN_UP} component={SignUp}/>
              </Grid>
            )}

            {user && (
              <Grid container xs={12}>
                <Grid item xs={2}>
                  {!isAdmin(user) && <UserToolBar user={user}/>}
                  {isAdmin(user) && <AdminToolBar/>}
                </Grid>

                <Grid item xs={10}>

                  {!isAdmin(user) && (
                    <Grid>
                      <Route exact path={USER_HOME} component={UserHome}/>
                      <Route exact path={FILES} component={PageWithFiles}/>
                      <Route exact path={SCHEDULE} component={MySchedule}/>
                    </Grid>
                  )}

                  {isStudent(user) && (
                    <Grid>
                      <Route exact path={TEACHERS} component={TeachersList}/>
                    </Grid>
                  )}

                  {isTeacher(user) && (
                    <Grid>
                      <Route exact path={ADD_FILE} component={AddFile}/>
                      <Route exact path={SHARE_FILES} component={ShareFiles}/>
                      <Route exact path={STUDENTS} component={StudentsList}/>
                    </Grid>
                  )}

                  {isAdmin(user) && (
                    <Grid>
                      <Route exact path={USER_HOME} component={UniversityStructure}/>
                      <Route exact path={ADD_LESSON} component={AddLesson}/>
                      <Route exact path={SCHEDULE} component={GroupSchedule}/>
                      <Route exact path={LECTURE_HALLS} component={LectureHalls}/>
                      <Route exact path={GROUP_PAGE_ROUTER}>
                        <OpenGroupPage/>
                      </Route>
                      <Route exact path={GROUP_SCHEDULE_ROUTER}>
                        <OpenGroupSchedule/>
                      </Route>
                    </Grid>
                  )}
                  <Grid>
                    <Route path={USER_HOME_PAGE_ROUTER}>
                      <OpenUserPage/>
                    </Route>
                    <Route path={USER_SCHEDULE_ROUTER}>
                      <OpenUserSchedule/>
                    </Route>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container justify={'center'} xs={12}>
            <Copyright/>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isFetching: state.loadingProcess.isFetching
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(App);
