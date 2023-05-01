import React, {useRef, useState} from 'react';
import {LogOutIcon} from '../../icons/LogOutIcon';
import {Button, ListGroup, Overlay, Popover} from 'react-bootstrap';
import {SmallAvatar} from '../common/components/SmallAvatar';
import {ListItem} from '../common/components/ListItem';
import {SwitchAccountIcon} from '../../icons/SwitchAccountIcon';
import i18n from '../../locales/i18n';
import {useDispatch, useSelector} from "react-redux";
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {roleActivated, selectActiveRole} from "../../store/user/authSlice";
import {useNavigate} from "react-router-dom";
import {authService, getId} from "../../services/authService";
import {USER_HOME} from "../../constants/links";
import {skipToken} from "@reduxjs/toolkit/query";
import {signOut} from "../../store/actions";

const textByRole = {
  ROLE_STUDENT: i18n.t('to_student'),
  ROLE_TEACHER: i18n.t('to_teacher'),
  ROLE_ADMIN: i18n.t('to_admin')
};

export function SwitchAccountPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useFetchUserQuery(getId() ?? skipToken).data;
  const activeRole = useSelector(selectActiveRole);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  function signOutFunc() {
    dispatch(signOut());
    authService.logout();
  }

  function updateUserRoleFunc(role) {
    dispatch(roleActivated(role));
    navigate(USER_HOME);
  }

  function handleClick(event) {
    setShow(!show);
    setTarget(event.target);
  }

  return (
    <div ref={ref} className={'justify-content-end d-flex'}>
      <Button onClick={handleClick} onBlur={() => setShow(false)} variant={'link'}>
        <SmallAvatar size={35} user={user}/>
      </Button>
      <Overlay show={show} target={target} placement='bottom' container={ref}>
        <Popover>
          <Popover.Header as='h1'><p>{user?.surname + ' ' + user?.firstName}</p></Popover.Header>
          <Popover.Body>
            <ListGroup variant='flush'>
              {activeRole && user?.roles.filter(role => role !== activeRole).map(role =>
                <ListGroup.Item
                  key={role}
                  action
                  onMouseDown={() => updateUserRoleFunc(role)}>
                  <ListItem icon={<SwitchAccountIcon/>} text={textByRole[role]} openEnabled={false}/>
                </ListGroup.Item>)}
              <ListGroup.Item action onMouseDown={signOutFunc} className={"no-padding"}>
                <ListItem icon={<LogOutIcon/>} text={i18n.t('sign_out')} openEnabled={false} smSize={2}/>
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}