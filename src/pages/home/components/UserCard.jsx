import i18n from '../../../config/i18n';
import {getName} from '../../../utils/UsersUtil';
import LoadPhoto from './LoadPhoto';
import {Card, Col, Row} from 'react-bootstrap';
import {CalendarWeekFill} from 'react-bootstrap-icons';
import {SCHEDULE, USER_SCHEDULE} from '../../../constants/links';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {errorAdded} from "../../../store/message/messageSlice";
import {useAvatarUploader} from "../../../hooks/useAvatatUploader";
import {useAvatarDownloader} from "../../../hooks/useAvatarDownloader";
import emptyAvatar from "../../../assets/empty-avatar.png"
import {useState} from "react";

export function UserCard({user, isMine}) {

  const dispatch = useDispatch();
  const uploadAvatar = useAvatarUploader();
  const [avatar, downloadAvatar] = useAvatarDownloader(user?.id);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let handleClickAvatar = () => {
    setOpen(true);
  };

  let handleSave = avatar => {
    setOpen(false);
    uploadAvatar(avatar, (error) => dispatch(errorAdded(error)))
      .then(() => downloadAvatar())
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
              src={!avatar ? emptyAvatar : avatar}
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
                  <div className="justify-content-end d-flex">
                    <CalendarWeekFill
                      className={"icon"}
                      onClick={() =>
                        navigate(isMine ? SCHEDULE : USER_SCHEDULE(user.id))
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle>
                <p>{user.role === 1 && i18n.t("group") + ": " + user?.group?.name}</p>
              </Card.Subtitle>
              <Card.Text>
                {i18n.t("email")}: {user?.email}
                <br/>
                {i18n.t("institute")}: {user?.institute?.name}
                <br/>
                {i18n.t("department")}: {user?.department?.name}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
