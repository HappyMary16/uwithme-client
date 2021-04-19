import React, { Component } from 'react';

import TopToolBarContainer from './pages/navigation/TopToolBarContainer';
import { PRE_HOME } from './constants/links';
import { UserToolBar } from './pages/user/UserToolBar';

import { connect } from 'react-redux';
import { isAdmin } from './utils/UsersUtil';
import { AdminToolBar } from './pages/admin/AdminToolBar';
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
import Container from 'react-bootstrap/Container';
import { AuthService } from './services/AuthService';
import { history } from './store/Store';
import { keycloakSignInSuccess, signOut } from './pages/authorization/actions';
import { CustomSpinner } from './pages/navigation/components/CustomSpinner';
import { PageRouter } from './pages/navigation/PageRouter';
import { Message } from './pages/common/components/Message';
import { removeMessage } from './actions/messageAction';
import ErrorContainer from './pages/common/containers/ErrorContainer';
import * as Config from './config.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();

    this.closeMessage = this.closeMessage.bind(this);
  }

  componentDidMount() {
    const { clientVersion, dispatch } = this.props;
    if (Config.client_version !== clientVersion) {
      dispatch(signOut);
    }

    this.authService.loadUser().then(() => {
      if (this.authService.isLoggingIn) {
        this.authService.completeLogin().then(() => {
          this.checkLogin();
        });
      } else if (this.authService.isLoggingOut) {
        this.authService.completeLogout().then(() => {
          this.checkLogin();
        });
      } else {
        this.checkLogin();
      }
    });
  }

  checkLogin() {
    const { user, dispatch } = this.props;

    if (this.authService.isLoggedIn) {
      dispatch(keycloakSignInSuccess());
      if (!user) {
        history.push(PRE_HOME);
      }
    } else {
      dispatch(signOut())
      this.authService.login();
    }
  }

  closeMessage() {
    const { dispatch } = this.props;
    dispatch(removeMessage());
  }

  render() {
    const { user, isFetching, isMenuOpen, message } = this.props;

    return (
      <Container fluid className={'main-container'}>
        {user && !isAdmin(user) && (
          <UserToolBar user={user} isOpen={isMenuOpen} />
        )}
        {isAdmin(user) && <AdminToolBar isOpen={isMenuOpen} />}

        <TopToolBarContainer />
        <CustomSpinner isFetching={isFetching} />

        <Message
          open={!!message}
          message={message}
          handleClose={this.closeMessage}
        />

        <ErrorContainer/>

        <PageRouter user={user} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    clientVersion: state.authReducers.clientVersion,
    isFetching: state.loadingProcess.isFetching,
    isMenuOpen: state.loadingProcess.isMenuOpen,
    message: state.messageReducers.message
  };
};

export default connect(mapStateToProps)(App);
