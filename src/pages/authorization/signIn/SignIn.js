import React from 'react';
import { SIGN_UP } from '../../../constants/links';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n';
import { signInRequest, signOut } from './actions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MortarBoardIcon } from '@primer/octicons-react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(signOut());
  }

  submit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(signInRequest(username, password));
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Row className="justify-content-center">
            <MortarBoardIcon className={'avatar-icon'} size={35} />
          </Row>
          <Row className="justify-content-center margin-bottom">
            <h5>{i18n.t('sign_in')}</h5>
          </Row>

          <Form onSubmit={this.submit}>
            <Form.Control
              placeholder={i18n.t('user_name') + ' *'}
              onChange={e => this.setState({ username: e.target.value })}
              required
            />
            <Form.Control
              placeholder={i18n.t('password') + ' *'}
              type={'password'}
              autoComplete={'current-password'}
              onChange={e => this.setState({ password: e.target.value })}
              required
            />
            <Button block variant={'purple'} type={'submit'}>
              {i18n.t('sign_in')}
            </Button>
          </Form>

          <a className={'link'} href={SIGN_UP}>
            {i18n.t('sign_up_button')}
          </a>
        </Col>
      </Row>
    );
  }
}

export default connect()(SignIn);
