import React, { Component } from 'react';
import { connect } from 'react-redux';
import Institute from '../components/Institute';
import { getDepartmentsByInstitute } from '../../../../utils/StructureUtils';
import {
  createDepartment,
  createGroup,
  createInstitute,
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../actions';
import { CreateStructurePanel } from '../components/CreatingStructurePanel';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

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
    const { dispatch, universityId } = this.props;

    dispatch(createInstitute(universityId, instituteName));
  }

  createDepartment(instituteName, instituteId, departmentName) {
    const { dispatch, universityId } = this.props;

    dispatch(createDepartment(universityId, instituteName, departmentName));
  }

  createGroup(instituteId, instituteName, departmentId, departmentName, course, groupName, isShowingInRegistration) {
    const { dispatch, universityId } = this.props;

    dispatch(createGroup(universityId, instituteName, departmentName, course, groupName, isShowingInRegistration));
  }

  render() {
    const { institutes, departments, groups } = this.props;

    return (
      <Container>
        <CreateStructurePanel institutes={institutes}
                              departments={departments}
                              createInstitute={this.createInstitute}
                              createDepartment={this.createDepartment}
                              createGroup={this.createGroup}/>

        <ListGroup variant='flush'>
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
    institutes: state.adminReducers.institutes,
    departments: state.adminReducers.departments,
    groups: state.adminReducers.groups,
    universityId: state.authReducers.user.universityId
  };
};

export default connect(mapStateToProps)(UniversityStructure);
