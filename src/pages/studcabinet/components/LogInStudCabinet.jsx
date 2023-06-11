import {Button, Form, Modal} from 'react-bootstrap';
import {USER_HOME} from '../../../constants/links';
import {Message} from '../../common/components/Message';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCredentials} from "../../../store/studcabinet/studCabinetSlice";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export function LogInStudCabinet({handleCreate}) {

  const {t, i18n} = useTranslation("studCabinet");

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const credentials = useSelector(selectCredentials);

  let submit = e => {
    e.preventDefault();
    handleCreate({email, password});
  };

  return (
    <div>
      <Message
        open={showMessage}
        message={t('can_not_show_stud_cab_info')}
        description={t('can_not_show_stud_cab_info_description')}
        handleClose={() => navigate(USER_HOME)}
      />

      <Modal show={!credentials} centered>
        <Modal.Header>
          <Modal.Title>{t('log_in_stud_cab')}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={submit}>
          <Modal.Body>
            <Form.Control
              placeholder={i18n.t('email')}
              onChange={e => setEmail(e.target.value)}
              type={'email'}
              required
            />
            <Form.Control
              placeholder={i18n.t('password')}
              onChange={e => setPassword(e.target.value)}
              type={'password'}
              required
            />
            <p>
              {t("see_info_in_stud_cabinet")}
              <br/>
              <a href={'https://studcabinet.kpi.kharkov.ua/'}>
                studcabinet.kpi.kharkov.ua
              </a>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => setShowMessage(true)} variant={'purple'}>
              {i18n.t('cancel')}
            </Button>
            <Button type={'submit'} variant={'purple'}>
              {i18n.t('sign_in')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
