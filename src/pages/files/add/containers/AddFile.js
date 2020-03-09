import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes, LECTURE } from '../../../../common/constants/userRoles';
import { Upload } from '../components/Upload';
import { loadSubjects } from '../../actions';
import Container from 'react-bootstrap/Container';
import i18n from '../../../../locales/i18n';
import { compose } from 'redux';
import { uploadRequest } from '../actions';

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { selectorColors } from '../../../../common/styles/styles';

const submit = {
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: '0px',
  backgroundColor: '#eeeeee'
};

const subjectSelector = {
  marginTop: '20px'
};

class AddFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      subject: '',
      fileType: LECTURE,
      uploading: false,
      successfulUploaded: false,
      subjectCreating: false
    };

    this.submit = this.submit.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.createSubject = this.createSubject.bind(this);
  }

  componentDidMount() {
    const { dispatch, username } = this.props;
    dispatch(loadSubjects(username));
  }

  submit() {
    const { dispatch, username } = this.props;
    const { subject, files, fileType } = this.state;

    this.setState({ uploading: true });

    dispatch(uploadRequest(files, username, subject.label, fileType));
    this.setState({
      uploading: false,
      successfulUploaded: true
    });
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

  render() {
    const { subjects } = this.props;
    const {
      fileType,
      uploading,
      successfulUploaded,
      subject,
      subjectCreating
    } = this.state;

    return (
      <Grid item xs={12}>
        <Container style={subjectSelector}>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('subject')}
            options={subjects.map(subject => {
              return {
                label: subject.name,
                value: subject.id
              };
            })}
            onChange={subject => this.setState({ subject: subject })}
            onCreateOption={this.createSubject}
            value={subject}
            isLoading={subjectCreating}
          />
        </Container>
        <Container style={subjectSelector}>
          <Select
            theme={selectorColors}
            onChange={opinion => this.setState({ fileType: opinion.value })}
            options={FileTypes}
            placeholder={i18n.t('file_type')}
          />
        </Container>

        <Grid item xs={12}>
          <Upload
            addFiles={this.addFiles}
            uploading={uploading}
            successfulUploaded={successfulUploaded}
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
    subjects: state.filesReducers.subjects
  };
};

export default compose(connect(mapStateToProps))(AddFile);
