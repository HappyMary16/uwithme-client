import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import logo from "../../assets/logo512.png"
import {USER_HOME} from "../../constants/links";
import {http} from "../../services/http";
import {Button, Col, Row} from "react-bootstrap";
import "../../styles/telegram.css"
import {useDispatch} from "react-redux";
import {messageAdded} from "../../store/message/messageSlice";
import {useTranslation} from "react-i18next";

export default function BotAuth() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation('bot')

  const [searchParams] = useSearchParams();
  const photoUrl = searchParams.get("photo_url")
  const username = searchParams.get("username");
  const userUrl = "https://t.me/" + username;

  useEffect(() => {
    if (!searchParams || searchParams.size === 0) {
      dispatch(messageAdded(t("telegram_auth_error")));
      navigate(USER_HOME);
    }
  }, [searchParams, dispatch, navigate, t])

  function loginCancel() {
    navigate(USER_HOME);
  }

  function loginConfirm() {
    const userData = Object.fromEntries(searchParams)

    http({method: "POST", url: "auth/bot", body: userData, isJson: true})
      .then((response) => {
        if (response.ok) {
          navigate(USER_HOME);
        } else {
          dispatch(messageAdded(t("telegram_auth_error")));
        }
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={5}>
        <div className="d-flex justify-content-center mt-3">
          <div className="login_telegram_photo_wrap arrowed">
            <a href={userUrl}>
              <img src={photoUrl} className="login_user_photo" alt={"Фото"}/>
            </a>
          </div>
          <a href="https://u-with-me.education">
            <img className="login_bot_photo" src={logo} alt={"Лого"}/>
          </a>
        </div>

        <div className="mt-3 mb-3">
          <p>
            {t("сlick_next_to_link_your_telegram_account") + ' '}
            <a href={userUrl}>{username}</a>
            {' ' + t("to_your_account")}
          </p>
        </div>

        <Row>
          <Button variant={"red"} onClick={loginCancel}>
            {i18n.t("cancel")}
          </Button>
          <Button variant={"purple"} onClick={loginConfirm}>
            {i18n.t("next")}
          </Button>
        </Row>
      </Col>
    </Row>);
}
