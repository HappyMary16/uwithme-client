import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeBotNotification } from '../../../actions/messageAction';
import { Notification } from '../components/Notification';
import i18n from '../../../locales/i18n';
import { SmallAvatar } from '../components/SmallAvatar';
import { Col, Row } from 'react-bootstrap';
import { TELEGRAM_BOT_URI } from '../../../config';

class BotNotification extends Component {
  constructor(props) {
    super(props);

    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage() {
    const { dispatch } = this.props;
    dispatch(closeBotNotification());
  }

  render() {
    const { wasBotNotificationShowed } = this.props;

    return (
      <Notification
        header={
          <Row className="justify-content-center">
            <Col xs={3} sm={3}>
              <SmallAvatar avatar={'/logo192.png'}/>
            </Col>
            <Col className="d-flex align-items-center">
              <p>{i18n.t('bot_notification_header')}</p>
            </Col>
          </Row>}
        text={
          <div>
            <p>{i18n.t('bot_notification_text')}</p>
            <a href={TELEGRAM_BOT_URI} target = "_blank" rel = "noopener noreferrer">
              @UniversityWithMe_bot
            </a>
          </div>}
        show={!wasBotNotificationShowed}
        onClose={this.closeMessage}/>

    );
  }
}

const mapStateToProps = state => {
  return {
    wasBotNotificationShowed: state.messageReducers.wasBotNotificationShowed
  };
};

export default connect(mapStateToProps)(BotNotification);
