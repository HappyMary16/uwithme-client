import React, { Component } from 'react';
import i18n from '../../../locales/i18n';
import Button from 'react-bootstrap/Button';
import {
  loadDepartments,
  loadGroups,
  loadInstitutes,
  loadUniversities
} from '../../admin/structure/actions';
import { signUpRequest } from '../signUp/actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MortarBoardIcon } from '@primer/octicons-react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { selectorColors } from '../../../styles/styles';
import { UserRoles } from '../../../constants/userRoles';
import { connect } from 'react-redux';

class ChooseRole extends Component {
  constructor(props) {
    super(props);
    this.state = {};

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
        this.state.userRole,
        this.state.institute,
        this.state.department,
        this.state.group,
        this.state.universityId,
        this.state.universityName
      )
    );
  }

  render() {
    const { groups, departments, institutes, universities } = this.props;
    const { userRole } = this.state;

    return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Row className="justify-content-center">
            <MortarBoardIcon className={'avatar-icon'} size={35} />
          </Row>
          <Row className="justify-content-center margin-bottom">
            <h5>{i18n.t('continue_sign_up')}</h5>
          </Row>
          <Form onSubmit={this.submit}>
            <Select
              className={'selector'}
              theme={selectorColors}
              placeholder={i18n.t('user_type') + ' *'}
              options={UserRoles}
              onChange={e => this.setState({ userRole: e.value })}
            />
            {userRole === 3 && (
              <Form.Control
                placeholder={i18n.t('university_name') + ' *'}
                onChange={e =>
                  this.setState({ universityName: e.target.value })
                }
                required
              />
            )}
            {userRole && userRole !== 3 && (
              <div>
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  placeholder={i18n.t('university') + ' *'}
                  options={universities}
                  onChange={e => this.setState({ universityId: e.value })}
                />
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  placeholder={i18n.t('institute') + ' *'}
                  options={institutes}
                  onChange={e => this.setState({ institute: e.value })}
                />
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  placeholder={i18n.t('department') + ' *'}
                  options={departments}
                  onChange={e => this.setState({ department: e.value })}
                />
              </div>
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

export default connect(mapStateToProps)(ChooseRole);
