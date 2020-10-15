import React from 'react';
import { UserRoles } from '../../../constants/userRoles';
import { SIGN_IN } from '../../../constants/links';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n';
import {
  loadDepartments,
  loadGroups,
  loadInstitutes,
  loadUniversities
} from '../../admin/structure/actions';
import { PasswordInput } from '../components/PasswordInput';
import { selectorColors } from '../../../styles/styles';
import { signUpRequest } from './actions';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PersonFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      institute: '1',
      department: '1',
      group: '1',
      scienceDegree: '1',
      firstName: '',
      lastName: '',
      surname: '',
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      email: '',
      studentId: '',
      university: '1'
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadUniversities());
    dispatch(loadInstitutes());
    dispatch(loadDepartments());
    dispatch(loadGroups());
  }

  submit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(
      signUpRequest(
        this.state.firstName,
        this.state.lastName,
        this.state.surname,
        this.state.username,
        this.state.password,
        this.state.confirmPassword,
        this.state.phone,
        this.state.email,
        this.state.userRole,
        this.state.studentId,
        this.state.scienceDegree,
        this.state.institute,
        this.state.department,
        this.state.group,
        this.state.university
      )
    );
  }

  render() {
    const {
      groups,
      departments,
      institutes,
      scienceDegrees,
      universities
    } = this.props;
    const {
      userRole,
      scienceDegree,
      institute,
      group,
      department,
      university
    } = this.state;

    return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Row className="justify-content-center">
            <PersonFill className={'avatar-icon'} size={35} />
          </Row>
          <Row className="justify-content-center margin-bottom">
            <h5>{i18n.t('sign_up')}</h5>
          </Row>
          <Form onSubmit={this.submit}>
            <Form.Control
              placeholder={i18n.t('first_name') + ' *'}
              onChange={e => this.setState({ firstName: e.target.value })}
              required
            />
            <Form.Control
              placeholder={i18n.t('surname') + ' *'}
              onChange={e => this.setState({ surname: e.target.value })}
              required
            />
            <Form.Control
              placeholder={i18n.t('last_name')}
              onChange={e => this.setState({ lastName: e.target.value })}
            />
            <Form.Control
              placeholder={i18n.t('email') + ' *'}
              onChange={e => this.setState({ email: e.target.value })}
              required
            />
            <PasswordInput
              setPasswordMethod={e => this.setState({ password: e })}
              setConfirmPasswordMethod={e =>
                this.setState({ confirmPassword: e })
              }
            />
            <Select
              className={'selector'}
              theme={selectorColors}
              placeholder={i18n.t('user_type') + ' *'}
              options={UserRoles}
              onChange={e => this.setState({ userRole: e.value })}
            />
            {userRole === 2 && (
              <Select
                className={'selector'}
                theme={selectorColors}
                placeholder={i18n.t('science_degree') + ' *'}
                options={scienceDegrees}
                onChange={e => this.setState({ scienceDegree: e.value })}
              />
            )}
            {userRole && (
              <Select
                className={'selector'}
                theme={selectorColors}
                placeholder={i18n.t('university') + ' *'}
                options={universities}
                onChange={e => this.setState({ university: e.value })}
              />
            )}
            {userRole && (
              <Select
                className={'selector'}
                theme={selectorColors}
                placeholder={i18n.t('institute') + ' *'}
                options={institutes}
                onChange={e => this.setState({ institute: e.value })}
              />
            )}
            {userRole && (
              <Select
                className={'selector'}
                theme={selectorColors}
                placeholder={i18n.t('department') + ' *'}
                options={departments}
                onChange={e => this.setState({ department: e.value })}
              />
            )}
            {userRole === 1 && (
              <Select
                className={'selector'}
                theme={selectorColors}
                placeholder={i18n.t('group') + ' *'}
                options={groups}
                onChange={e => this.setState({ group: e.value })}
              />
            )}
            <Button block variant={'purple'} type={'submit'}>
              {i18n.t('sign_up')}
            </Button>
          </Form>
          <Row className="justify-content-end">
            <a className={'link'} href={SIGN_IN}>
              {i18n.t('sign_in_button')}
            </a>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    institutes: state.adminReducers.institutes,
    departments: state.adminReducers.departments,
    groups: state.adminReducers.groups,
    scienceDegrees: state.adminReducers.scienceDegrees,
    universities: state.adminReducers.universities
  };
};

export default connect(mapStateToProps)(SignUp);
