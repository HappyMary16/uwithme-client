import '../../styles/navigation.css';
import {Col, Image, Nav, Row} from 'react-bootstrap';
import {MenuIcon} from '../../icons/MenuIcon';
import {SwitchAccountPanel} from './SwitchAccoutPanel';
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {authService, getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import uwmLogo from "../../assets/UniversityWithMeLongLogo.png"
import {LogOutIcon} from "../../icons/LogOutIcon";
import {signOut} from "../../store/actions";
import {useDispatch} from "react-redux";

export function TopToolBar({onMenuClick}) {

  const dispatch = useDispatch();
  const user = useFetchUserQuery(getId() ?? skipToken).data;

  function signOutFunc() {
    dispatch(signOut());
    authService.logout();
  }

  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <MenuIcon onClick={onMenuClick}/>
        </Col>
      )}

      <Col>
        {user
          ? <Row className="justify-content-center">
            <Image src={uwmLogo} alt="" title="institute" className={"app-icon"}/>
          </Row>
          : <Image src={uwmLogo} alt="" title="institute" className={"app-icon"}/>
        }
      </Col>

      <Col xs={2} sm={1} className="d-flex justify-content-end">
        <Row className="d-flex align-items-center">
          {user
            ? <SwitchAccountPanel/>
            : <LogOutIcon onClick={signOutFunc}/>
          }
        </Row>
      </Col>

    </Nav>
  );
}
