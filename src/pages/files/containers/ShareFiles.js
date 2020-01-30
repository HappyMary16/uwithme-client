import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FieldWithChoice } from '../../../common/components/FieldWithChoice';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreatableSelect from 'react-select/creatable';
import Container from 'react-bootstrap/Container';
import { loadSubjects } from '../../student/actions/userActions';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  },
  formControl: {
    marginTop: '10px',
    marginLeft: '20px'
  },
  multipleSelect: {}
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

  let submit = () => {};

  let onChange = () => {};

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
        <Grid container xs={12}>
          <Grid item xs={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">{i18n.t('lecture')}</FormLabel>
              <FormGroup>
                {lectures.map(lecture => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={false}
                        color="primary"
                        onChange={onChange('gilad')}
                        value={lecture}
                      />
                    }
                    label={lecture}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">{i18n.t('task')}</FormLabel>
              <FormGroup>
                {tasks.map(task => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={false}
                        color="primary"
                        onChange={onChange('gilad')}
                        value={task}
                      />
                    }
                    label={task}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid item xs={12}>
          <Container>
            <CreatableSelect
              className={classes.multipleSelect}
              isMulti
              onChange={onChange()}
              options={groups}
            />
          </Container>
        </Grid>
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
    subjects: state.userReducers.subjects,
    lectures: ['Лекція 1', 'Лекція 2'],
    tasks: ['Завдання 1', 'Завдання 2', 'Завдання 3'],
    groups: state.infoReducers.groups
  };
};

ShareFiles = connect(mapStateToProps)(ShareFiles);

export default ShareFiles;
