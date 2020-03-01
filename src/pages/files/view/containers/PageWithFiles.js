import React from 'react';

import { SubjectFiles } from '../components/SubjectFiles';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ADD_FILE, SHARE_FILES } from '../../../../common/constants/links';
import i18n from '../../../../locales/i18n';
import { TEACHER } from '../../../../common/constants/userRoles';
import { getFilesByUsername, loadSubjects } from '../../actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  link: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
    backgroundColor: '#eeeeee'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  }
});

class PageWithFiles extends React.Component {
  componentDidMount() {
    const { dispatch, username } = this.props;
    dispatch(loadSubjects(username));
    dispatch(getFilesByUsername(username));
  }

  render() {
    const { userRole, subjects, files, classes } = this.props;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container xs={6} className={classes.buttons}>
          {userRole === TEACHER && (
            <Button
              href={ADD_FILE}
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              {i18n.t('add_files_page')}
            </Button>
          )}
          {userRole === TEACHER && (
            <Button
              href={SHARE_FILES}
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              {i18n.t('share_files_page')}
            </Button>
          )}
        </Grid>
        <List component="nav" className={classes.list}>
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
