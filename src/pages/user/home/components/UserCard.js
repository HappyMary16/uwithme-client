import React, {useEffect} from 'react';
import i18n from '../../../../locales/i18n';
import {getName} from '../../../../utils/UsersUtil';
import LoadPhoto from './LoadPhoto';
import {Card, Col, Row} from 'react-bootstrap';
import {CalendarWeekFill} from 'react-bootstrap-icons';
import {SCHEDULE, USER_SCHEDULE} from '../../../../constants/links';
import {useNavigate} from "react-router-dom";
import {downloadAvatar} from "../../../../services/avatarService";

export function UserCard({ user, onSaveAvatar, isMine }) {

  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      downloadAvatar(user.id)
        .then(response => setAvatar(response))
    }
  }, [user])

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
                <p>{user.role === 1 && i18n.t("group") + ": " + user?.group?.name}</p>
              </Card.Subtitle>
              <Card.Text>
                {i18n.t("email")}: {user?.email}
                <br />
                {i18n.t("institute")}: {user?.institute?.name}
                <br />
                {i18n.t("department")}: {user?.department?.name}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
