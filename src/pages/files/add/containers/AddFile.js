import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes, LECTURE } from '../../../../common/constants/userRoles';
import { SelectField } from '../../../../common/components/SelectField';
import { Upload } from '../components/Upload';
import { loadSubjects } from '../../actions';
import Container from 'react-bootstrap/Container';
import i18n from '../../../../locales/i18n';
import { compose } from 'redux';
import { saveSubject, uploadRequest } from '../actions';

import CreatableSelect from 'react-select/creatable';

const submit = {
  marginTop: '10px',
  marginLeft: 'auto',
  marginRight: '0px'
};

const subjectSelector = {
  marginTop: '20px'
};

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#483D8B',
    primary50: '#D3D3D3',
    primary25: '#F5F5F5'
  }
});

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
      subjectCreating: true
    });

    setTimeout(() => {
      const { dispatch, username } = this.props;
      dispatch(saveSubject(username, subjectName));

      this.setState({
        subject: {
          value: subjectName,
          label: subjectName
        },
        subjectCreating: false
      });
    }, 1000);
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
            theme={theme}
            placeholder={i18n.t('subject')}
            options={subjects.map(subject => {
              return {
                label: subject.name,
                value: subject.id
              };
            })}
            onChange={subject => this.setState({ subject: subject })}
            onCreateOption={subject => this.createSubject(subject)}
            value={subject}
            isLoading={subjectCreating}
          />
        </Container>
        <Container>
          <SelectField
            label={i18n.t('file_type')}
            initialValue={fileType}
            values={FileTypes}
            onChange={fileType => this.setState({ fileType: fileType })}
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
              variant="contained"
              color="primary"
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