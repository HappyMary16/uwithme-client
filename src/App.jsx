import React, {useEffect, useState} from 'react';

import {UserToolBar} from './pages/navigation/UserToolBar';

import {useDispatch, useSelector} from 'react-redux';
import {AdminToolBar} from './pages/navigation/AdminToolBar';
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
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
import {CustomSpinner} from './pages/common/CustomSpinner';
import {Message} from './pages/common/components/Message';
import ErrorContainer from './pages/common/ErrorContainer';
import * as config from './config';
import {ADMIN, STUDENT} from './constants/userRoles';
import BotNotification from './pages/common/BotNotification';
import {Outlet, useNavigate} from "react-router-dom";
import {TopToolBar} from "./pages/navigation/TopToolBar";
import {PRE_HOME} from "./constants/links";
import {useFetchUserQuery} from "./store/user/userApiSlice";
import {selectActiveRole} from "./store/user/authSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {messageRemoved, selectMessage} from "./store/message/messageSlice";
import {signOut} from "./store/actions";
import {loadState, saveState} from "./store/StateLoader";
import {CLIENT_VERSION_STATE} from "./constants/common";

export const selectApiLoading = (state) => {
  return Object.values(state)
    .filter(api => api.queries)
    .flatMap(api => Object.values(api.queries))
    .some(query => query.status === 'pending');
};

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpened, setMenuOpened] = useState(false);

  const {data, error} = useFetchUserQuery(getId() ?? skipToken);
  const activeRole = useSelector(selectActiveRole);
  const message = useSelector(selectMessage);
  const isFetching = useSelector(selectApiLoading);

  const isLoggedIn = authService.isLoggedIn();

  useEffect(() => {
    if (config.CLIENT_VERSION !== loadState(CLIENT_VERSION_STATE)) {
      console.log("Client version is updated")
      localStorage.clear();
      saveState(CLIENT_VERSION_STATE, config.CLIENT_VERSION);
      window.location.reload();
    } else {
      console.log("Client version is not changed")
    }
  }, [])

  useEffect(() => {
    data && authService.tryToRefresh()
  }, [data])

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
        ? <AdminToolBar isOpen={menuOpened} onClose={() => setMenuOpened(false)}/>
        : <UserToolBar isOpen={menuOpened} onClose={() => setMenuOpened(false)}/>}

      <TopToolBar onMenuClick={() => setMenuOpened(!menuOpened)}/>
      <CustomSpinner isFetching={isFetching}/>

      <Message open={!!message} message={message} handleClose={() => dispatch(messageRemoved())}/>
      <ErrorContainer/>

      <Container className={'main-page-container'}>
        <Outlet/>
      </Container>
      {activeRole === STUDENT && <BotNotification/>}
    </Container>
  );
}