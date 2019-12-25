import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreatableSelect from 'react-select/creatable';
import { Upload } from '../components/Upload';
import { uploadRequest } from '../upload/actions';
import Container from 'react-bootstrap/Container';
import { loadSubjects, saveSubject } from '../../student/actions/userActions';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

let ShareFiles = ({
  dispatch,
  teacherUsername,
  subjects,
  lectures,
  tasks,
  groups
}) => {
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
          fieldName={'Subject'}
          listChoices={subjects.map(subject => subject.name)}
          onChange={setSubject}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Lectures</FormLabel>
          <FormGroup>
            {lectures.map(lecture => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange('gilad')}
                    value="gilad"
                  />
                }
                label="Gilad Gray"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Tasks</FormLabel>
          <FormGroup>
            {tasks.map(task => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange('gilad')}
                    value="gilad"
                  />
                }
                label="Gilad Gray"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Container>
        <CreatableSelect
          isMulti
          onChange={this.handleChange}
          options={groups}
        />
      </Container>
      <Container>
        <Grid container alignItems={'right'}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Upload
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    teacherUsername: state.authReducers.user.username,
    subjects: state.userReducers.subjects,
    lectures: [],
    tasks: [],
    groups: []
  };
};

ShareFiles = connect(mapStateToProps)(ShareFiles);

export default ShareFiles;
