import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Notification} from '../components/Notification';
import i18n from '../../../locales/i18n';
import {SmallAvatar} from '../components/SmallAvatar';
import {Col, Row} from 'react-bootstrap';
import {TELEGRAM_BOT_URI} from '../../../config';
import {botShown, selectBotShown} from "../../../store/bot/botSlice";

export default function BotNotification() {

  const dispatch = useDispatch();

  const wasBotNotificationShown = useSelector(selectBotShown);

  function closeMessage() {
    dispatch(botShown());
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
      show={!wasBotNotificationShown}
      onClose={closeMessage}/>
  );
}
