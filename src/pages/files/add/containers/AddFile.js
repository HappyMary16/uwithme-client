import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes, LECTURE } from '../../../../constants/userRoles';
import { Upload } from '../components/Upload';
import { loadSubjects } from '../../actions';
import i18n from '../../../../locales/i18n';
import { compose } from 'redux';
import { clearUploadProgress, clearUploadSuccess, uploadRequest } from '../actions';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { marginTop, selectorColors } from '../../../../common/styles/styles';
import Container from '@material-ui/core/Container';
import { Message } from '../../../../common/components/Message';

const submit = {
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: '0px',
  backgroundColor: '#eeeeee'
};

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
    this.createSubject = this.createSubject.bind(this);
    this.uploadingEnded = this.uploadingEnded.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadSubjects());
  }

  submit() {
    const { dispatch, username } = this.props;
    const { subject, files, fileType } = this.state;

    this.setState({ uploading: true });

    dispatch(uploadRequest(files, username, subject.label, fileType));
  }

  createSubject(subjectName) {
    this.setState({
      subject: {
        value: subjectName,
        label: subjectName
      }
    });
  }

  addFiles(addedFiles) {
    this.setState({ files: addedFiles });
  }

  uploadingEnded() {
    this.setState({
      uploading: false,
      files: []
    });

    const { dispatch } = this.props;
    dispatch(clearUploadSuccess());
    dispatch(clearUploadProgress());
  }

  render() {
    const { subjects, uploadProgress, uploadSuccess } = this.props;
    const { uploading, subject, files } = this.state;

    return (
      <Grid item xs={12}>
        <Message open={uploadSuccess} handleClose={this.uploadingEnded} message={i18n.t('files_is_uploaded')}/>
        <Container style={marginTop}>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('subject')}
            options={subjects && subjects.map(subject => {
              return {
                label: subject.name,
                value: subject.id
              };
            })}
            onChange={subject => this.setState({ subject: subject })}
            onCreateOption={this.createSubject}
            value={subject}
          />
        </Container>
        <Container style={marginTop}>
          <Select
            theme={selectorColors}
            onChange={opinion => this.setState({ fileType: opinion.value })}
            options={FileTypes}
            placeholder={i18n.t('file_type')}
          />
        </Container>

        <Grid item xs={12}>
          <Upload
            uploadProgress={uploadProgress}
            addFiles={this.addFiles}
            files={files}
            uploading={uploading}
            successfulUploaded={uploadSuccess}
          />
        </Grid>
        <Container>
          <Grid container alignItems={'flex-end'}>
            <Button
              style={submit}
              type="submit"
              color="primary"
              variant="outlined"
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
    subjects: state.filesReducers.subjects,
    uploadProgress: state.filesReducers.uploadProgress,
    uploadSuccess: state.filesReducers.uploadSuccess
  };
};

export default compose(connect(mapStateToProps))(AddFile);
