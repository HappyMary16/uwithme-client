import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { ADD_INSTITUTE } from '../../../constants/links';
import i18n from '../../../locales/i18n';
import {
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../../../common/actions';
import Institute from '../components/structure/Institute';
import { getDepartmentsByInstitute } from '../../../utils/StructureUtils';

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

class InstitutesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.someAction = this.someAction.bind(this);
    this.instituteHandleClick = this.instituteHandleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadInstitutesByUniversityId(universityId));
      dispatch(loadDepartmentsByUniversityId(universityId));
      dispatch(loadGroupsByUniversityId(universityId));
    }
  }

  instituteHandleClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { institutes, departments, groups, classes } = this.props;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container xs={6} className={classes.buttons} justify="flex-end">
          <Button
            href={ADD_INSTITUTE}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            {i18n.t('add_institute')}
          </Button>
        </Grid>
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
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups,
    universityId: state.authReducers.user.universityId
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(InstitutesList);
