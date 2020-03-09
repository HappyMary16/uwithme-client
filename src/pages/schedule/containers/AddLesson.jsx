import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import i18n from '../../../locales/i18n';
import {
  loadDepartmentsByUniversityId,
  loadGroupsByUniversityId,
  loadInstitutesByUniversityId
} from '../../../common/actions';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import { selectorColors } from '../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { LESSONS_TIME, WEEK_DAYS, WEEK_NUMBER } from '../../../constants/userRoles';
import { addLessonToSchedule } from '../actions';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  link: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: '#eeeeee'
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  marginTop: {
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: '0px',
    backgroundColor: '#eeeeee'
  }
});

class AddLesson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: {},
      teacher: {},
      lectureHall: '',
      selectedGroups: [],
      weekDay: 0,
      lessonTime: 0,
      weekNumber: 1
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadInstitutesByUniversityId(universityId));
      dispatch(loadDepartmentsByUniversityId(universityId));
      dispatch(loadGroupsByUniversityId(universityId));

      //TODO
      // load teachers by university id
      // load subjects by university id
      // load auditory by university id
      // load lessons time (feature)
    }
  }

  submit() {
    const { dispatch } = this.props;
    const { subject, teacher, lectureHall, selectedGroups, weekDay, lessonTime, weekNumber } = this.state;
    dispatch(addLessonToSchedule(subject.value,
      subject.label,
      teacher.value,
      teacher.label,
      lectureHall.label,
      selectedGroups,
      weekDay,
      lessonTime,
      weekNumber));
  }

  render() {
    const { teachers, lectureHalls, groups, subjects, classes } = this.props;

    return (
      <Grid xs={12} alignItems={'center'}>
        <Container className={classes.marginTop}>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('subject')}
            options={subjects &&
            subjects.map(subject => {
              return {
                label: subject.name,
                value: subject.id
              };
            })}
            onChange={opinion => this.setState({ subject: opinion })}
            onCreateOption={opinion => this.setState({ subject: opinion })}
          />
        </Container>

        <Container className={classes.marginTop}>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('teacher')}
            options={teachers &&
            teachers.map(s => {
              return {
                value: s.id,
                label: s.name
              };
            })}
            onChange={opinion => this.setState({ teacher: opinion })}
            onCreateOption={this.createSubject}
          />
        </Container>

        <Container className={classes.marginTop}>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('lecture_hall')}
            options={lectureHalls &&
            lectureHalls.map(s => {
              return {
                value: s.id,
                label: s.name
              };
            })}
            onChange={opinion => this.setState({ lectureHall: opinion })}
            onCreateOption={opinion => this.setState({ lectureHall: opinion })}
          />
        </Container>

        <Container className={classes.marginTop}>
          <Select
            placeholder={i18n.t('groups')}
            theme={selectorColors}
            isMulti
            onChange={opinion => this.setState({ selectedGroups: opinion })}
            options={groups}
          />
        </Container>

        <Container className={classes.marginTop}>
          <Select
            theme={selectorColors}
            onChange={opinion => this.setState({ weekDay: opinion.value })}
            options={WEEK_DAYS}
            placeholder={i18n.t('week_day')}
          />
        </Container>

        <Container className={classes.marginTop}>
          <Select
            theme={selectorColors}
            onChange={opinion => this.setState({ lessonTime: opinion.value })}
            options={LESSONS_TIME}
            placeholder={i18n.t('lesson_time')}
          />
        </Container>

        <Container className={classes.marginTop}>
          <Select
            theme={selectorColors}
            onChange={opinion => this.setState({ weekNumber: opinion.value })}
            options={WEEK_NUMBER}
            defaultValue={WEEK_NUMBER[0]}
          />
        </Container>

        <Container>
          <Grid container alignItems={'right'}>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.submit}
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
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups,
    universityId: state.authReducers.user.universityId
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddLesson);
