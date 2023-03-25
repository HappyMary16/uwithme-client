import React from 'react';
import { connect } from 'react-redux';
import { FileTypes, LECTURE } from '../../../constants/userRoles';
import { Upload } from './components/Upload';
import i18n from '../../../locales/i18n';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { selectorColors } from '../../../styles/styles';
import { Message } from '../../common/components/Message';
import { Button, Col } from 'react-bootstrap';
import {
  clearUploadProgress,
  clearUploadSuccess,
  loadSubjectsAndFiles,
  uploadRequest
} from '../../../actions/fileActions';

class AddFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      subject: "",
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
    const { dispatch, userId } = this.props;
    dispatch(loadSubjectsAndFiles(userId));
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
      <div>
        <Message
          open={uploadSuccess}
          handleClose={this.uploadingEnded}
          message={i18n.t("files_is_uploaded")}
        />
        <CreatableSelect
          className={"selector"}
          theme={selectorColors}
          placeholder={i18n.t("subject")}
          options={
            subjects &&
            subjects.map(subject => {
              return {
                label: subject.name,
                value: subject.id
              };
            })
          }
          onChange={subject => this.setState({ subject: subject })}
          onCreateOption={this.createSubject}
          value={subject}
        />
        <Select
          className={"selector"}
          theme={selectorColors}
          onChange={opinion => this.setState({ fileType: opinion.value })}
          options={FileTypes}
          placeholder={i18n.t("file_type")}
        />
        <Upload
          uploadProgress={uploadProgress}
          addFiles={this.addFiles}
          files={files}
          uploading={uploading}
          successfulUploaded={uploadSuccess}
        />
        <Col
          xs={12}
          md={{ offset: 9, span: 3 }}
          lg={{ offset: 9, span: 3 }}
          xl={{ offset: 10, span: 2 }}
        >
          <Button
            block
            type={"submit"}
            variant={"purple"}
            onClick={this.submit}
          >
            {i18n.t("upload")}
          </Button>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducers.user.id,
    username: state.authReducers.user.username,
    subjects: state.filesReducers.subjects,
    uploadProgress: state.filesReducers.uploadProgress,
    uploadSuccess: state.filesReducers.uploadSuccess
  };
};

export default connect(mapStateToProps)(AddFile);
