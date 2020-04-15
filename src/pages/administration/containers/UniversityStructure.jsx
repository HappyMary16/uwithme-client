import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Institute from '../components/structure/Institute';
import { getDepartmentsByInstitute } from '../../../utils/StructureUtils';
import {
  createDepartment,
  createGroup,
  createInstitute,
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../actions';
import { CreateStructurePanel } from '../components/structure/CreatingStructurePanel';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  link: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: '#eeeeee'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

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
      dispatch(loadInstitutesByUniversityId(universityId));
      dispatch(loadDepartmentsByUniversityId(universityId));
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

    if (instituteName === instituteId) {
      dispatch(loadInstitutesByUniversityId(universityId));
    }
  }

  createGroup(instituteId, instituteName, departmentId, departmentName, course, groupName) {
    const { dispatch, universityId } = this.props;

    dispatch(createGroup(universityId, instituteName, departmentName, course, groupName));

    if (instituteName === instituteId) {
      dispatch(loadInstitutesByUniversityId(universityId));
    }
    if (departmentName === departmentId) {
      dispatch(loadDepartmentsByUniversityId(universityId));
    }
  }

  render() {
    const { institutes, departments, groups, classes } = this.props;

    return (
      <Grid container xs={12} className={classes.root}>

        <CreateStructurePanel institutes={institutes}
                              departments={departments}
                              createInstitute={this.createInstitute}
                              createDepartment={this.createDepartment}
                              createGroup={this.createGroup}/>

        <List component="nav" className={classes.list}>
          {institutes &&
          institutes.map((institute, i) => (
            <Institute
              key={i}
              institute={institute}
              departments={getDepartmentsByInstitute(departments, institute)}
              groups={groups}
              classes={classes}
            />
          ))}
        </List>
      </Grid>
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

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(UniversityStructure);
