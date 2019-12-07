import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FileTypes } from '../../../constants/userTypes';
import { SelectField } from '../../../components/SelectField';

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

  let submit = e => {
    e.preventDefault();
    console.log('value');
    console.log(subject);
    console.log('file');
    console.log(fileType);
    //TODO: send correct data
    //signUpRequestFunc(firstName, lastName, email, password);
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </Grid>
  );
};

AddFile = connect()(AddFile);

export default AddFile;
