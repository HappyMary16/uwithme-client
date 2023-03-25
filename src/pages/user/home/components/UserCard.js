import React from 'react';
import i18n from '../../../../locales/i18n';
import { getName, getUserGroup } from '../../../../utils/UsersUtil';
import LoadPhoto from './LoadPhoto';
import { Card, Col, Row } from 'react-bootstrap';
import { CalendarWeekFill } from 'react-bootstrap-icons';
import { SCHEDULE, USER_SCHEDULE } from '../../../../constants/links';
import {useNavigate} from "react-router-dom";

export const UserCard = ({ user, avatar, onSaveAvatar, isMine }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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
              className={"avatar"}
              alt="Avatar"
              src={!avatar ? "/empty-avatar.jpg" : avatar}
              onClick={handleClickAvatar}
            />
          </Row>
        </Col>

        <Col>
          <Card border="light">
            <Card.Header as="h5">
              <Row>
                <Col xs={9} md={10}>
                  {getName(user)}
                </Col>

                <Col xs={3} md={2}>
                  <Row className="justify-content-end">
                    <CalendarWeekFill
                      className={"icon"}
                      size={"1.3em"}
                      onClick={() =>
                        navigate(isMine ? SCHEDULE : USER_SCHEDULE(user.id))
                      }
                    />
                  </Row>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle>
                <p>{user.role === 1 && i18n.t("group") + ": " + getUserGroup(user)}</p>
              </Card.Subtitle>
              <Card.Text>
                {user.phone && i18n.t("phone") + ": " + user.phone}
                {user.phone && <br />}
                {i18n.t("email")}: {user.email}
                <br />
                {i18n.t("institute")}: {user.instituteName}
                <br />
                {i18n.t("department")}: {user.departmentName}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
