import React from 'react';
import i18n from '../../../../locales/i18n';
import { getName, getUserGroup } from '../../../../utils/UsersUtil';
import LoadPhoto from './LoadPhoto';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const UserCard = ({ user, avatar, onSaveAvatar, isMine }) => {
  const [open, setOpen] = React.useState(false);

  let handleClickAvatar = () => {
    setOpen(true);
  };

  let handleSave = avatar => {
    setOpen(false);
    onSaveAvatar(avatar);
  };

  return (
    <div>
      {isMine && (
        <LoadPhoto
          onSave={handleSave}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}

      <Row>
        <Col xs={12} md={5} lg={4} xl={3}>
          <Row className="justify-content-center">
            <img
              className={'avatar'}
              alt="Avatar"
              src={!avatar ? '/empty-avatar.jpg' : avatar}
              onClick={handleClickAvatar}
            />
          </Row>
        </Col>

        <Col>
          <Card border="light">
            <Card.Header as="h5">
              <Row>
                <Col xs={10} md={11}>
                  {getName(user)}
                </Col>
                {/*<Col xs={2} md={1}>*/}
                {/*  <CalendarWeekFill*/}
                {/*    className={'icon'}*/}
                {/*    // onClick={() => history.push(GROUP_SCHEDULE(group.value))}*/}
                {/*  />*/}
                {/*</Col>*/}
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle>
                {user.role === 1 &&
                  i18n.t('group') + ': ' + getUserGroup(user)}
              </Card.Subtitle>
              <Card.Text>
                {user.phone && i18n.t('phone') + ': ' + user.phone}
                {user.phone && <br />}
                {i18n.t('email')}: {user.email}
                <br />
                {i18n.t('institute')}: {user.instituteName}
                <br />
                {i18n.t('department')}: {user.departmentName}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
