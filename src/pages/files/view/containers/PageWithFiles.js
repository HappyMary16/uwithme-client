import React from 'react';

import { SubjectFiles } from '../components/SubjectFiles';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ADD_FILE, SHARE_FILES } from '../../../../constants/links';
import i18n from '../../../../locales/i18n';
import { TEACHER } from '../../../../constants/userRoles';
import { loadSubjectsAndFiles } from '../../actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  link: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    backgroundColor: '#eeeeee'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  }
});

class PageWithFiles extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadSubjectsAndFiles());
  }

  render() {
    const { userRole, subjects, files, classes } = this.props;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container className={classes.buttons} justify='flex-end'>
          {userRole === TEACHER && (
            <Button
              href={ADD_FILE}
              color='primary'
              variant='outlined'
              className={classes.link}
            >
              {i18n.t('add_files_page')}
            </Button>
          )}
          {userRole === TEACHER && (
            <Button
              href={SHARE_FILES}
              color='primary'
              variant='outlined'
              className={classes.link}
            >
              {i18n.t('share_files_page')}
            </Button>
          )}
        </Grid>
        <List component='nav' className={classes.list}>
          {subjects &&
          subjects.map((subject, i) => (
            <SubjectFiles
              key={i}
              name={subject.name}
              files={
                files && files.filter(file => file.subjectId === subject.id)
              }
            />
          ))}
        </List>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRole: state.authReducers.user.role,
    subjects: state.filesReducers.subjects,
    files: state.filesReducers.files,
    username: state.authReducers.user.username
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(PageWithFiles);
