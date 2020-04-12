import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import i18n from '../../../locales/i18n';
import {
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../../../common/actions';
import Institute from '../components/structure/Institute';
import { getDepartmentsByInstitute } from '../../../utils/StructureUtils';
import { createInstitute } from '../actions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

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
      open: false,
      openInstituteDialog: false,
      instituteName: ''
    };

    this.createInstitute = this.createInstitute.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadInstitutesByUniversityId(universityId));
      dispatch(loadDepartmentsByUniversityId(universityId));
      dispatch(loadGroupsByUniversityId(universityId));
    }
  }

  handleClose() {
    this.setState({ openInstituteDialog: false });
  }

  createInstitute(instituteName) {
    const { dispatch, universityId } = this.props;

    dispatch(createInstitute(universityId, instituteName));
    this.setState({ openInstituteDialog: false });
  }

  render() {
    const { institutes, departments, groups, classes } = this.props;
    const { openInstituteDialog, instituteName } = this.state;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container xs={6} className={classes.buttons} justify="flex-end">
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={() => {
              this.setState({ openInstituteDialog: true });
            }}
          >
            {i18n.t('create_institute')}
          </Button>


          <Dialog open={openInstituteDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{i18n.t('create_institute')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {i18n.t('input_institute_name')}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={i18n.t('institute_name')}
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({ instituteName: e.target.value });
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                {i18n.t('cancel')}
              </Button>
              <Button onClick={() => this.createInstitute(instituteName)} color="primary">
                {i18n.t('create')}
              </Button>
            </DialogActions>
          </Dialog>


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
