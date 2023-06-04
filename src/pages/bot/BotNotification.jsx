import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Notification} from '../common/components/Notification';
import {SmallAvatar} from '../common/components/SmallAvatar';
import {Col, Row} from 'react-bootstrap';
import {TELEGRAM_BOT_URI} from '../../config';
import {botShown, selectBotShown} from "../../store/bot/botSlice";
import {useTranslation} from "react-i18next";

export default function BotNotification() {

  const dispatch = useDispatch();
  const {t} = useTranslation('bot')

  const wasBotNotificationShown = useSelector(selectBotShown);

  function closeMessage() {
    dispatch(botShown());
  }

  return (
    <Notification
      header={
        <Row>
          <Col xs={3} className="d-flex align-items-center">
            <SmallAvatar image={'/logo192.png'}/>
          </Col>
          <Col className="d-flex align-items-center">
            <p>{t('bot_notification_header')}</p>
          </Col>
        </Row>}
      text={
        <div>
          <p>{t('bot_notification_text') + ' '}</p>
          <a href={TELEGRAM_BOT_URI} rel="noopener noreferrer">
            @{TELEGRAM_BOT_URI.substring(TELEGRAM_BOT_URI.lastIndexOf('/') + 1)}
          </a>
        </div>}
      show={!wasBotNotificationShown}
      onClose={closeMessage}/>
  );
}
