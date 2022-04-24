import React, { Component } from 'react';
import { connect } from 'react-redux';
import Institute from './components/Institute';
import { getDepartmentsByInstitute } from '../../../utils/StructureUtils';
import { CreateStructurePanel } from './components/CreatingStructurePanel';
import { Container, ListGroup } from 'react-bootstrap';
import { EmptyPage } from '../../common/components/EmptyPage';
import { createInstitute, loadInstitutesByUniversityId } from '../../../actions/instituteActions';
import { createDepartment, loadDepartmentsByUniversityId } from '../../../actions/departmentActions';
import { createGroup, loadGroupsByUniversityId } from '../../../actions/groupActions';

class UniversityStructure extends Component {
  constructor(props) {
    super(props);

    this.createInstitute = this.createInstitute.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadInstitutesByUniversityId());
      dispatch(loadDepartmentsByUniversityId());
      dispatch(loadGroupsByUniversityId(universityId));
    }
  }

  createInstitute(instituteName) {
    const { dispatch } = this.props;

    dispatch(createInstitute(instituteName));
  }

  createDepartment(instituteName, instituteId, departmentName) {
    const { dispatch, universityId } = this.props;

    dispatch(createDepartment(universityId, instituteName, instituteId, departmentName));
  }

  createGroup(
    instituteId,
    instituteName,
    departmentId,
    departmentName,
    course,
    groupName,
    isShowingInRegistration
  ) {
    const { dispatch, universityId } = this.props;

    dispatch(
      createGroup(
        universityId,
        instituteId,
        instituteName,
        departmentId,
        departmentName,
        course,
        groupName,
        isShowingInRegistration
      )
    );
  }

  render() {
    const { institutes, departments, groups, isFetching } = this.props;

    return (
      <Container>
        <CreateStructurePanel
          institutes={institutes}
          departments={departments}
          createInstitute={this.createInstitute}
          createDepartment={this.createDepartment}
          createGroup={this.createGroup}
        />

        <EmptyPage list={institutes} isFetching={isFetching} />

        <ListGroup variant="flush">
          {institutes &&
            institutes.map((institute, i) => (
              <Institute
                key={i}
                institute={institute}
                departments={getDepartmentsByInstitute(departments, institute)}
                groups={groups}
              />
            ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    institutes: state.instituteReducers.institutes,
    departments: state.departmentReducers.departments,
    groups: state.groupReducers.groups,
    universityId: state.authReducers.user.universityId,
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(UniversityStructure);
