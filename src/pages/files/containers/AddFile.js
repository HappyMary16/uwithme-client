import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes } from '../../../constants/userTypes';
import { SelectField } from '../../../components/SelectField';
import { Upload } from '../components/Upload';
import { Uploader } from '../upload/uploader';
import { Dropzone } from '../components/Dropzone';
import { uploadRequest } from '../upload/actions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0, 0, 2)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

let AddFile = ({ dispatch }) => {
  const classes = useStyles();

  const [subject, setSubject] = React.useState('');
  let [fileType, setFileType] = React.useState('LECTURE');

  let files = [];
  let [uploading, setUploading] = React.useState(false);
  let [successfulUploaded, setSuccessfulUploaded] = React.useState(false);

  let submit = () => {
    setUploading(true);
    dispatch(uploadRequest(files));
    setSuccessfulUploaded(true);
  };

  let addFiles = addedFiles => {
    files = addedFiles;
  };

  return (
    <Grid xs={12} className={classes.root}>
      <form className={classes.form} noValidate onSubmit={e => submit(e)}>
        <Grid item xs={6}>
          <FieldWithChoice
            fieldName={'Subject'}
            listChoices={['name1', 'name2', 'other']}
            onChange={setSubject}
          />
        </Grid>

        <Grid item xs={6}>
          <SelectField
            label={'File type'}
            initialValue={fileType}
            values={FileTypes}
            onChange={setFileType}
          />
        </Grid>

        <Uploader />
        <Upload
          addFiles={addFiles}
          uploading={uploading}
          successfulUploaded={successfulUploaded}
        />
        <Dropzone />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submit}
        >
          Upload
        </Button>
      </form>
    </Grid>
  );
};

AddFile = connect()(AddFile);

export default AddFile;
