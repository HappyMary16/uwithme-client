import {useDispatch, useSelector} from 'react-redux';
import {Toast, ToastContainer} from 'react-bootstrap';
import {TELEGRAM_BOT_URI} from '../../config';
import {botShown, selectBotShown} from "../../store/bot/botSlice";
import {useTranslation} from "react-i18next";
import logo from '../../assets/logo192.png'

export default function BotNotification() {

  const dispatch = useDispatch();
  const {t} = useTranslation('bot')

  const wasBotNotificationShown = useSelector(selectBotShown);

  function closeMessage() {
    dispatch(botShown());
  }

  return (
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={!wasBotNotificationShown} onClose={closeMessage} delay={0} animation={false}>
          <Toast.Header>
            <img src={logo} width={30} className="me-2" alt="logo"/>
            <strong className="me-auto"><p>{t('bot_notification_header')}</p></strong>
          </Toast.Header>
          <Toast.Body>
            <p>{t('bot_notification_text') + ' '}</p>
            <a href={TELEGRAM_BOT_URI} rel="noopener noreferrer">
              @{TELEGRAM_BOT_URI.substring(TELEGRAM_BOT_URI.lastIndexOf('/') + 1)}
            </a>
          </Toast.Body>
        </Toast>
      </ToastContainer>
  );
}
