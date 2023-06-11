import {Button, Col, Form, Row} from 'react-bootstrap';
import i18n from '../../../config/i18n';
import {KEYCLOAK_USER_SETTINGS} from '../../../constants/keycloakApi';

export function KeycloakSetting({ user }) {
  const { firstName, middleName, surname, email } = user??{};

  return (
    <div>
      <Form.Label>{i18n.t('first_name')}</Form.Label>
      <Form.Control
        defaultValue={firstName}
        required
        readOnly
      />
      <Form.Label>{i18n.t('middle_name')}</Form.Label>
      <Form.Control
        defaultValue={middleName}
        required
        readOnly
      />
      <Form.Label>{i18n.t('surname')}</Form.Label>
      <Form.Control
        defaultValue={surname}
        required
        readOnly
      />
      <Form.Label>{i18n.t('email')}</Form.Label>
      <Form.Control
        type="email"
        defaultValue={email}
        required
        readOnly
      />

      <Row className="justify-content-around">
        <Col xs={12} md={{ offset: 8, span: 4 }} lg={{ offset: 9, span: 3 }}>
          <Button
            type={'submit'}
            variant={'purple'}
            href={KEYCLOAK_USER_SETTINGS}
          >
            {i18n.t('edit')}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
