import React, { Component } from "react";

import TopToolBarContainer from "./pages/navigation/TopToolBarContainer";
import { UserToolBar } from "./pages/user/UserToolBar";

import { connect } from "react-redux";
import { isAdmin } from "./utils/UsersUtil";
import { AdminToolBar } from "./pages/admin/AdminToolBar";
import "./styles/button.css";
import "./styles/listItem.css";
import "./styles/spases.css";
import "./styles/menu.css";
import "./styles/inputField.css";
import "./styles/mainPage.css";
import "./styles/modalBackdrop.css";
import "./styles/icon.css";
import "./styles/link.css";
import "./styles/scheduleTable.css";
import "./styles/text.css";
import "./styles/avatar.css";
import "./styles/table.css";
import Container from "react-bootstrap/Container";
import { authService } from "./services/http.js";
import { CustomSpinner } from "./pages/navigation/components/CustomSpinner";
import { PageRouter } from "./pages/navigation/PageRouter";
import { Message } from "./pages/common/components/Message";
import { removeMessage } from "./actions/messageAction";
import ErrorContainer from "./pages/common/containers/ErrorContainer";
import * as config from "./config";
import { signInRequest, signOut } from "./actions/authActions";
import { changeIsMenuOpen } from './actions/navigationActions';

class App extends Component {
  constructor(props) {
    super(props);

    const { clientVersion, dispatch } = this.props;
    if (config.CLIENT_VERSION !== clientVersion) {
      console.log("Client version is updated")
      dispatch(signOut());
    } else {
      console.log("Client version is not changed")
    }

    this.closeMessage = this.closeMessage.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;

    if (!authService.isLoggedIn) {
      dispatch(signOut());
    } else if (!user) {
      dispatch(signInRequest());
    }
  }

  closeMessage() {
    const { dispatch } = this.props;
    dispatch(removeMessage());
  }

  closeMenu() {
    const { dispatch } = this.props;
    dispatch(changeIsMenuOpen());
  }

  render() {
    const { user, isFetching, isMenuOpen, message } = this.props;

    return (
      <Container fluid className={"main-container"}>
        {!isAdmin(user) && <UserToolBar user={user} isOpen={isMenuOpen} onClose={this.closeMenu}/>}
        {isAdmin(user) && <AdminToolBar isOpen={isMenuOpen} onClose={this.closeMenu}/>}

        <TopToolBarContainer />
        <CustomSpinner isFetching={isFetching} />

        <Message
          open={!!message}
          message={message}
          handleClose={this.closeMessage}
        />

        <ErrorContainer />

        <PageRouter user={user} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    clientVersion: state.authReducers.clientVersion,
    isFetching: state.navigationReducers.isFetching,
    isMenuOpen: state.navigationReducers.isMenuOpen,
    message: state.messageReducers.message
  };
};

export default connect(mapStateToProps)(App);
