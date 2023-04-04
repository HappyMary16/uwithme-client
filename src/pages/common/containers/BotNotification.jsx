import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {closeBotNotification} from '../../../actions/messageAction';
import {Notification} from '../components/Notification';
import i18n from '../../../locales/i18n';
import {SmallAvatar} from '../components/SmallAvatar';
import {Col, Row} from 'react-bootstrap';
import {TELEGRAM_BOT_URI} from '../../../config';

export default function BotNotification() {

  const dispatch = useDispatch();

  const wasBotNotificationShowed = useSelector(state => state.messageReducers.wasBotNotificationShowed);

  function closeMessage() {
    dispatch(closeBotNotification());
  }

  return (
    <Notification
      header={
        <Row className="justify-content-center">
          <Col xs={3} sm={3}>
            <SmallAvatar image={'/logo192.png'}/>
          </Col>
          <Col className="d-flex align-items-center">
            <p>{i18n.t('bot_notification_header')}</p>
          </Col>
        </Row>}
      text={
        <div>
          <p>{i18n.t('bot_notification_text')}</p>
          <a href={TELEGRAM_BOT_URI} target="_blank" rel="noopener noreferrer">
            @UniversityWithMe_bot
          </a>
        </div>}
      show={!wasBotNotificationShowed}
      onClose={closeMessage}/>
  );
}
