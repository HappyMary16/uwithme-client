import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import i18n from '../../../../locales/i18n';
import { KEYCLOAK_USER_SETTINGS } from '../../../../constants/keycloakApi';

export const KeycloakSetting = ({ user }) => {
  const { firstName, middleName, surname, email } = user;

  return (
    <div>
      <Form.Label>{i18n.t('first_name')}</Form.Label>
      <Form.Control
        onChange={e => this.setState({ firstName: e.target.value })}
        value={firstName}
        required
        readOnly
      />
      <Form.Label>{i18n.t('last_name')}</Form.Label>
      <Form.Control
        onChange={e => this.setState({ middleName: e.target.value })}
        value={middleName}
        required
        readOnly
      />
      <Form.Label>{i18n.t('surname')}</Form.Label>
      <Form.Control
        onChange={e => this.setState({ surname: e.target.value })}
        value={surname}
        required
        readOnly
      />
      <Form.Label>{i18n.t('email')}</Form.Label>
      <Form.Control
        type="email"
        onChange={e => this.setState({ email: e.target.value })}
        value={email}
        required
        readOnly
      />

      <Row className="justify-content-around">
        <Col xs={12} md={{ offset: 8, span: 4 }} lg={{ offset: 9, span: 3 }}>
          <Button
            block
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
};
