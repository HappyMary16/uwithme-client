import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../common/components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes, LECTURE } from '../../../common/constants/userRoles';
import { SelectField } from '../../../common/components/SelectField';
import { Upload } from '../components/Upload';
import { loadSubjects, saveSubject, uploadRequest } from '../upload/actions';
import Container from 'react-bootstrap/Container';
import i18n from '../../../locales/i18n';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0, 0, 2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  submit: {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: '20px'
  }
}));

class AddFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      subject: '',
      fileType: LECTURE,
      uploading: false,
      successfulUploaded: false
    };

    this.submit = this.submit.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.ifSubjectDoesNotExist = this.ifSubjectDoesNotExist.bind(this);
  }

  componentDidMount() {
    const { dispatch, username } = this.props;
    dispatch(loadSubjects(username));
  }

  submit() {
    const { dispatch, username } = this.props;
    const { subject, files, fileType } = this.state;

    this.ifSubjectDoesNotExist(subject);

    this.setState({ uploading: true });

    dispatch(uploadRequest(files, username, subject, fileType));
    this.setState({
      uploading: false,
      successfulUploaded: true
    });
  }

  ifSubjectDoesNotExist(subjectName) {
    const { dispatch, username } = this.props;

    if (
      !this.props.subjects.map(subject => subject.name).includes(subjectName)
    ) {
      dispatch(saveSubject(username, subjectName));
    }
  }

  addFiles(addedFiles) {
    this.setState({ files: addedFiles });
  }

  render() {
    const { classes, subjects } = this.props;
    const { fileType, uploading, successfulUploaded } = this.state;

    return (
      <Grid xs={12} className={classes.root} alignItems={'center'}>
        <Grid item xs={12}>
          <FieldWithChoice
            fieldName={i18n.t('subject')}
            listChoices={subjects.map(subject => subject.name)}
            onChange={subject => this.setState({ subject: subject })}
          />
        </Grid>
        <Container>
          <Container>
            <SelectField
              label={i18n.t('file_type')}
              initialValue={fileType}
              values={FileTypes}
              onChange={fileType => this.setState({ fileType: fileType })}
            />
          </Container>
        </Container>

        <Grid item xs={12}>
          <Upload
            addFiles={this.addFiles}
            uploading={uploading}
            successfulUploaded={successfulUploaded}
          />
        </Grid>
        <Container>
          <Grid container alignItems={'right'}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.submit}
            >
              {i18n.t('upload')}
            </Button>
          </Grid>
        </Container>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.authReducers.user.username,
    subjects: state.filesReducers.subjects
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddFile);
