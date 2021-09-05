import React, { useRef, useState } from 'react';
import { LogOutIcon } from '../../icons/LogOutIcon';
import Row from 'react-bootstrap/Row';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import { SmallAvatar } from '../../common/components/SmallAvatar';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListItem } from '../../common/components/ListItem';
import { SwitchAccountIcon } from '../../icons/SwitchAccountIcon';
import i18n from '../../../locales/i18n';
import { getUserRoles } from '../../../utils/UsersUtil';

export const SwitchAccountPanel = ({ user, avatar, open, handleClose, signOutFunc }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const textByRole = {
    ROLE_STUDENT: i18n.t("to_student"),
    ROLE_TEACHER: i18n.t("to_teacher"),
    ROLE_ADMIN: i18n.t("to_admin")
  }

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <Row ref={ref} className={'justify-content-end'}>
      <div onClick={handleClick} className={'log-out-icon'}>
        <SmallAvatar size={35} avatar={avatar}/>
      </div>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
      >
        <Popover id="popover-basic"
                 className='overlay'>
          <Popover.Title as="h1"><p>{user.surname + ' ' + user.firstName}</p></Popover.Title>
          <Popover.Content>
            <ListGroup variant="flush">
              {getUserRoles().map(role => <ListGroup.Item
                action
                onClick={() => {
                }}
              >
                <ListItem icon={<SwitchAccountIcon/>} text={textByRole[role]} openEnabled={false}/>
              </ListGroup.Item>)}
              <ListGroup.Item
                action
                onClick={signOutFunc()}
              >
                <ListItem icon={<LogOutIcon size={'1.5em'}/>} text={i18n.t("sign_out")} openEnabled={false}/>
              </ListGroup.Item>
            </ListGroup>
          </Popover.Content>
        </Popover>
      </Overlay>
    </Row>
  );
};