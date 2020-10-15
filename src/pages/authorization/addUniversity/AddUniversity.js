import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n';
import { PasswordInput } from '../components/PasswordInput';
import { addUniversity } from './actions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PersonFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      universityName: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordError: false
    };

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(
      addUniversity(
        this.state.universityName,
        this.state.username,
        this.state.password,
        this.state.confirmPassword
      )
    );
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Row className="justify-content-center">
            {/*TODO change icon*/}
            {/*<SchoolIcon />*/}
            <PersonFill className={'avatar-icon'} size={35} />
          </Row>
          <Row className="justify-content-center margin-bottom">
            <h5>{i18n.t('add_university')}</h5>
          </Row>

          <Form onSubmit={this.submit}>
            <Form.Control
              placeholder={i18n.t('university_name') + ' *'}
              onChange={e => this.setState({ universityName: e.target.value })}
              required
            />
            <Form.Control
              placeholder={i18n.t('admin_username') + ' *'}
              onChange={e => this.setState({ username: e.target.value })}
              required
            />
            <PasswordInput
              setPasswordMethod={e => this.setState({ password: e })}
              setConfirmPasswordMethod={e =>
                this.setState({ confirmPassword: e })
              }
            />
            <Button block variant={'purple'} type={'submit'}>
              {i18n.t('add')}
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

export default connect(mapStateToProps)(AddUniversity);
