import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from '../../../../locales/i18n';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CustomSelector } from '../../../common/components/CustomSelector';

class EditSetting extends Component {
  constructor(props) {
    super(props);

    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup
    } = this.props;

    this.state = {
      university: userUniversity,
      institute: userInstitute,
      department: userDepartment,
      group: userGroup
    };

    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.setUniversity = this.setUniversity.bind(this);
    this.setInstitute = this.setInstitute.bind(this);
    this.setDepartment = this.setDepartment.bind(this);
  }

  cancel() {
    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup,
      setEditMode
    } = this.props;

    this.setState({
      university: userUniversity,
      institute: userInstitute,
      department: userDepartment,
      group: userGroup
    });

    setEditMode(false);
  }

  submit(e) {
    e.preventDefault();

    const { onSave } = this.props;
    const { university, institute, department, group } = this.state;

    onSave({
      university,
      institute,
      department,
      group
    });
  }

  setUniversity(e) {
    const { setUniversity } = this.props;

    this.setState({
      university: e,
      institute: null,
      department: null,
      group: null
    });

    setUniversity(e);
  }

  setInstitute(e) {
    const { setInstitute } = this.props;

    this.setState({
      institute: e,
      department: null,
      group: null
    });

    setInstitute(e);
  }

  setDepartment(e) {
    const { setDepartment } = this.props;

    this.setState({
      department: e,
      group: null
    });

    setDepartment(e);
  }

  render() {
    const {
      isEditMode,
      groups,
      departments,
      institutes,
      universities,
      role,
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup
    } = this.props;
    const { university, institute, department, group } = this.state;

    return (
      <Form onSubmit={this.submit}>
        <Form.Label>{i18n.t('university')}</Form.Label>
        <CustomSelector
          isEditMode={role !== 3 && isEditMode}
          options={universities}
          value={university !== undefined ? university : userUniversity}
          onChange={this.setUniversity}
        />
        {role && role !== 3 && (
          <div>
            <Form.Label>{i18n.t('institute')}</Form.Label>
            <CustomSelector
              isEditMode={isEditMode}
              options={institutes}
              value={institute !== undefined ? institute : userInstitute}
              onChange={this.setInstitute}
            />
            <Form.Label>{i18n.t('department')}</Form.Label>
            <CustomSelector
              isEditMode={isEditMode}
              options={departments}
              value={department !== undefined ? department : userDepartment}
              onChange={this.setDepartment}
            />
          </div>
        )}
        {role === 1 && (
          <div>
            <Form.Label>{i18n.t('group')}</Form.Label>
            <CustomSelector
              isEditMode={isEditMode}
              options={groups}
              value={group !== undefined ? group : userGroup}
              onChange={value => this.setState({ group: value })}
            />
          </div>
        )}
        {isEditMode && (
          <Row className="justify-content-around">
            <Col
              xs={12}
              md={{ offset: 4, span: 4 }}
              lg={{ offset: 6, span: 3 }}
              xl={{ offset: 6, span: 3 }}
            >
              <Button block variant={'purple'} onClick={() => this.cancel()}>
                {i18n.t('cancel')}
              </Button>
            </Col>
            <Col xs={12} md={4} lg={3} xl={3}>
              <Button block variant={'purple'} type={'submit'}>
                {i18n.t('save')}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    );
  }
}

export default EditSetting;
