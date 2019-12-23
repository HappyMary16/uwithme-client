import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes } from '../../../constants/userRoles';
import { SelectField } from '../../../components/SelectField';
import { Upload } from '../components/Upload';
import { uploadRequest } from '../upload/actions';
import Container from 'react-bootstrap/Container';

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

let AddFile = ({ dispatch }) => {
  const classes = useStyles();

  let files = [];
  let [subject, setSubject] = React.useState('');
  let [fileType, setFileType] = React.useState('LECTURE');

  let [uploading, setUploading] = React.useState(false);
  let [successfulUploaded, setSuccessfulUploaded] = React.useState(false);

  let submit = () => {
    setUploading(true);
    dispatch(uploadRequest(files, subject.value, fileType.value));
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
          listChoices={['name1', 'name2', 'other']}
          onChange={setSubject}
        />
      </Grid>

      <Grid item xs={12}>
        <SelectField
          label={'File type'}
          initialValue={fileType}
          values={FileTypes}
          onChange={setFileType}
        />
      </Grid>

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
            Upload
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

AddFile = connect()(AddFile);

export default AddFile;
