import React from 'react';
import '../../styles/navigation.css';
import {Col, Nav, Row} from 'react-bootstrap';
import {MenuIcon} from '../icons/MenuIcon';
import {SwitchAccountPanel} from './components/SwitchAccoutPanel';
import {authService} from "../../services/authService";
import {signOut} from "../../actions/authActions";
import {changeIsMenuOpen} from "../../actions/navigationActions";
import {updateActiveRole} from "../../actions/userActions";
import {USER_HOME} from "../../constants/links";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export function TopToolBar() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducers.user);
  const avatar = useSelector(state => state.authReducers.avatar);
  const navigate = useNavigate();

  function signOutFunc() {
    dispatch(signOut());
    authService.logout();
  }

  function openMenu() {
    dispatch(changeIsMenuOpen());
  }

  function updateUserRoleFunc(role) {
    dispatch(updateActiveRole(role));
    navigate(USER_HOME);
  }

  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <MenuIcon onClick={openMenu}/>
        </Col>
      )}
      {user && (
        <Col>
          <Row className="justify-content-center">
            <img
              src="./UniversityWithMeLongLogo.png"
              alt=""
              title="institute"
              className={"app-icon"}
            />
          </Row>
        </Col>
      )}
      {!user && (
        <Col>
          <img
            src="./UniversityWithMeLongLogo.png"
            alt=""
            title="institute"
            className={"app-icon"}
          />
        </Col>
      )}
      {user && (
        <Col xs={2}>
          <SwitchAccountPanel avatar={avatar}
                              user={user}
                              signOutFunc={signOutFunc}
                              updateUserRoleFunc={updateUserRoleFunc}/>
        </Col>
      )}
    </Nav>
  );
}
