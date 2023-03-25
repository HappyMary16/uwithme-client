import React, { useRef, useState } from 'react';
import { LogOutIcon } from '../../icons/LogOutIcon';
import { Button, ListGroup, Overlay, Popover, Row } from 'react-bootstrap';
import { SmallAvatar } from '../../common/components/SmallAvatar';
import { ListItem } from '../../common/components/ListItem';
import { SwitchAccountIcon } from '../../icons/SwitchAccountIcon';
import i18n from '../../../locales/i18n';
import { getInactiveRoles } from '../../../utils/UsersUtil';

export const SwitchAccountPanel = ({ user, avatar, signOutFunc, updateUserRoleFunc }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const textByRole = {
    ROLE_STUDENT: i18n.t('to_student'),
    ROLE_TEACHER: i18n.t('to_teacher'),
    ROLE_ADMIN: i18n.t('to_admin')
  };

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleBlur = () => {
    setShow(false);
  };

  return (
    <Row ref={ref} className={'justify-content-end'}>
      <Button onClick={handleClick} onBlur={handleBlur} variant={'link'}>
        <SmallAvatar size={35} avatar={avatar} />
      </Button>

      <Overlay
        show={show}
        target={target}
        placement='bottom'
        container={ref.current}
      >
        <Popover id='popover-basic'
                 className='overlay'>
          <Popover.Header as='h1'><p>{user.surname + ' ' + user.firstName}</p></Popover.Header>
          <Popover.Body>
            <ListGroup variant='flush'>
              {getInactiveRoles(user).map(role => <ListGroup.Item
                key={role}
                action
                onMouseDown={updateUserRoleFunc(role)}>
                <ListItem icon={<SwitchAccountIcon />} text={textByRole[role]} openEnabled={false} />
              </ListGroup.Item>)}
              <ListGroup.Item
                action
                onMouseDown={signOutFunc}
              >
                <ListItem icon={<LogOutIcon size={'1.5em'} />} text={i18n.t('sign_out')} openEnabled={false} />
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </Row>
  );
};