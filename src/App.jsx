import React, {useEffect} from 'react';

import {UserToolBar} from './pages/user/UserToolBar';

import {useDispatch, useSelector} from 'react-redux';
import {AdminToolBar} from './pages/admin/AdminToolBar';
import "bootstrap/dist/css/bootstrap.min.css"
import './styles/button.css';
import './styles/listItem.css';
import './styles/spases.css';
import './styles/menu.css';
import './styles/inputField.css';
import './styles/mainPage.css';
import './styles/modalBackdrop.css';
import './styles/icon.css';
import './styles/link.css';
import './styles/scheduleTable.css';
import './styles/text.css';
import './styles/avatar.css';
import './styles/table.css';
import './styles/notification.css';
import {Container} from 'react-bootstrap';
import {authService, getId} from './services/authService';
import {CustomSpinner} from './pages/navigation/components/CustomSpinner';
import {Message} from './pages/common/components/Message';
import {removeMessage} from './actions/messageAction';
import ErrorContainer from './pages/common/containers/ErrorContainer';
import * as config from './config';
import {signOut} from './actions/authActions';
import {changeIsMenuOpen} from './actions/navigationActions';
import {ADMIN, STUDENT} from './constants/userRoles';
import BotNotification from './pages/common/containers/BotNotification';
import {Outlet, useNavigate} from "react-router-dom";
import {TopToolBar} from "./pages/navigation/TopToolBar";
import {PRE_HOME} from "./constants/links";
import {useFetchUserQuery} from "./store/user/userApiSlice";
import {selectActiveRole, selectClientVersion} from "./store/user/authSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export const selectApiLoading = (state) => {
  return Object.values(state)
    .filter(api => api.queries)
    .flatMap(api => Object.values(api.queries))
    .some(query => query.status === 'pending');
};

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {data, error} = useFetchUserQuery(getId() ?? skipToken);
  const activeRole = useSelector(selectActiveRole);
  const clientVersion = useSelector(selectClientVersion);
  const isMenuOpen = useSelector(state => state.navigationReducers.isMenuOpen);
  const message = useSelector(state => state.messageReducers.message);

  const isFetching = useSelector(selectApiLoading);

  const isLoggedIn = authService.isLoggedIn();

  useEffect(() => {
    data && authService.tryToRefresh()
  }, [data])

  useEffect(() => {
    if (config.CLIENT_VERSION !== clientVersion) {
      console.log("Client version is updated")
      dispatch(signOut());
    } else {
      console.log("Client version is not changed")
    }
  }, [clientVersion, dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(signOut());
    } else if (error?.status === 404) {
      navigate(PRE_HOME);
    }
  }, [error, isLoggedIn, dispatch, navigate])

  return (
    <Container fluid className={"main-container"}>
      {activeRole === ADMIN
        ? <AdminToolBar isOpen={isMenuOpen} onClose={() => dispatch(changeIsMenuOpen())}/>
        : <UserToolBar isOpen={isMenuOpen} onClose={() => dispatch(changeIsMenuOpen())}/>}

      <TopToolBar/>
      <CustomSpinner isFetching={isFetching}/>

      <Message
        open={!!message}
        message={message}
        handleClose={() => dispatch(removeMessage())}
      />

      <ErrorContainer/>

      <Container className={'main-page-container'}>
        <Outlet/>
      </Container>
      {activeRole === STUDENT && <BotNotification/>}
    </Container>
  );
}