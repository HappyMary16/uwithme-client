import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../common/components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes } from '../../../common/constants/userRoles';
import { SelectField } from '../../../common/components/SelectField';
import { Upload } from '../components/Upload';
import { uploadRequest } from '../upload/actions';
import Container from 'react-bootstrap/Container';
import { loadSubjects, saveSubject } from '../../student/actions/userActions';
import i18n from '../../../locales/i18n';

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

let AddFile = ({ dispatch, teacherUsername, subjects }) => {
  const classes = useStyles();

  dispatch(loadSubjects(teacherUsername));

  let files = [];
  let [subjectValue, setSubject] = React.useState('');
  let [fileType, setFileType] = React.useState('LECTURE');

  let [uploading, setUploading] = React.useState(false);
  let [successfulUploaded, setSuccessfulUploaded] = React.useState(false);

  let submit = () => {
    if (!subjects.map(subject => subject.name).includes(subjectValue)) {
      dispatch(saveSubject(teacherUsername, subjectValue));
    }
    setUploading(true);
    const subjectId = subjects.filter(
      subject => subject.name === subjectValue
    )[0].id;
    dispatch(uploadRequest(files, subjectId, fileType));
    setSuccessfulUploaded(true);
  };

  let addFiles = addedFiles => {
    files = addedFiles;
  };

  return (
    <Grid xs={12} className={classes.root} alignItems={'center'}>
      <Grid item xs={12}>
        <FieldWithChoice
          fieldName={i18n.t('subject')}
          listChoices={subjects.map(subject => subject.name)}
          onChange={setSubject}
        />
      </Grid>
      <Container>
        <Container>
          <SelectField
            label={i18n.t('file_type')}
            initialValue={fileType}
            values={FileTypes}
            onChange={setFileType}
          />
        </Container>
      </Container>

      <Grid item xs={12}>
        <Upload
          addFiles={addFiles}
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
            onClick={submit}
          >
            {i18n.t('upload')}
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    teacherUsername: state.authReducers.user.username,
    subjects: state.userReducers.subjects
  };
};

AddFile = connect(mapStateToProps)(AddFile);

export default AddFile;
