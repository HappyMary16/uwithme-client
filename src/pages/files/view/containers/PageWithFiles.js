import React from 'react';

import { SubjectFiles } from '../components/SubjectFiles';

import List from '@material-ui/core/List';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ADD_FILE, SHARE_FILES } from '../../../../common/constants/links';
import { Copyright } from '../../../../common/components/Copyright';
import i18n from '../../../../locales/i18n';
import { TEACHER } from '../../../../common/constants/userRoles';
import { getFilesBySubjectId, loadSubjects } from '../../actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';

const useStyles = theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  link: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
    backgroundColor: '#eeeeee',
    color: '#212121',
    border: `1px solid ${theme.palette.divider}`
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

    if (this.props.subjects) {
      this.props.subjects.forEach(subject => {
        dispatch(getFilesBySubjectId(username, subject.id));
      });
    }
  }

  render() {
    return (
      <Grid container xs={12} className={this.props.classes.root}>
        <Grid container xs={6} className={this.props.classes.buttons}>
          {this.props.userRole === TEACHER && (
            <Button
              href={ADD_FILE}
              variant="outlined"
              className={this.props.classes.link}
            >
              {i18n.t('add_files_page')}
            </Button>
          )}
          {this.props.userRole === TEACHER && (
            <Button
              href={SHARE_FILES}
              variant="outlined"
              className={this.props.classes.link}
            >
              {i18n.t('share_files_page')}
            </Button>
          )}
        </Grid>
        <List component="nav" className={this.props.classes.list}>
          {this.props.subjects &&
            this.props.subjects.map((subject, i) => (
              <SubjectFiles
                key={i}
                name={subject.name}
                files={
                  this.props.files &&
                  this.props.files.filter(file => file.subjectId === subject.id)
                }
              />
            ))}
        </List>

        <Grid xs={12}>
          <Copyright />
        </Grid>
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
