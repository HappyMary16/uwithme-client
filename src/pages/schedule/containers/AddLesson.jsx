import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import i18n from '../../../locales/i18n';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import { selectorColors } from '../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { LESSONS_TIME, WEEK_DAYS, WEEK_NUMBER } from '../../../constants/userRoles';
import { addLessonToSchedule } from '../actions';
import { loadTeachersByUniversityId } from '../../users/actions';
import { loadSubjectsByUniversityId } from '../../files/actions';
import { loadGroupsByUniversityId } from '../../administration/structure/actions';
import { loadBuildings, loadLectureHalls } from '../../administration/lectureHalls/action';
import { getBuildingByLectureHall, getLectureHallsByBuilding } from '../../../utils/StructureUtils';

const useStyles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
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
      building: null,
      lectureHall: null,
      selectedGroups: [],
      weekDays: [],
      lessonTimes: [],
      weekNumbers: [],
      filteredLectureHalls: []
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadGroupsByUniversityId(universityId));
      dispatch(loadTeachersByUniversityId(universityId));
      dispatch(loadSubjectsByUniversityId(universityId));
      dispatch(loadBuildings(universityId));
      dispatch(loadLectureHalls(universityId));

      //TODO
      // load lessons time (feature)
    }
  }

  submit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { subject, teacher, lectureHall, selectedGroups, weekDays, lessonTimes, weekNumbers } = this.state;

    dispatch(addLessonToSchedule(subject.value,
      subject.label,
      teacher.value,
      teacher.label,
      lectureHall.value,
      selectedGroups,
      weekDays,
      lessonTimes,
      weekNumbers));
  }

  render() {
    let { filteredLectureHalls, lectureHall, building } = this.state;
    const { teachers, lectureHalls, buildings, groups, subjects, classes } = this.props;

    if (!filteredLectureHalls || filteredLectureHalls.length === 0) {
      filteredLectureHalls = lectureHalls;
    }

    return (
      <Grid xs={12} alignItems={'center'}>
        <form className={classes.form} onSubmit={e => this.submit(e)}>
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
                  label: s.surname + ' ' + s.firstName + ' ' + s.lastName
                };
              })}
              onChange={opinion => this.setState({ teacher: opinion })}
            />
          </Container>

          <Grid container direction='row' xs={12}>
            <Grid xs={6}>
              <Container className={classes.marginTop}>
                <Select
                  value={building}
                  theme={selectorColors}
                  placeholder={i18n.t('building')}
                  options={buildings}
                  onChange={opinion => {
                    let lectureHallsForBuilding = getLectureHallsByBuilding(lectureHalls, opinion);
                    this.setState({
                      building: opinion,
                      filteredLectureHalls: lectureHallsForBuilding,
                      lectureHall: lectureHallsForBuilding.includes(lectureHall) ? lectureHall : null
                    });
                  }}
                />
              </Container>
            </Grid>

            <Grid xs={6}>
              <Container className={classes.marginTop}>
                <Select
                  value={lectureHall}
                  theme={selectorColors}
                  placeholder={i18n.t('lecture_hall')}
                  options={filteredLectureHalls}
                  onChange={opinion => {
                    this.setState({
                      lectureHall: opinion,
                      building: getBuildingByLectureHall(buildings, opinion),
                      filteredLectureHalls: getLectureHallsByBuilding(lectureHalls, opinion)
                    });
                  }}
                />
              </Container>
            </Grid>
          </Grid>

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
              onChange={opinion => this.setState({ weekDays: opinion })}
              options={WEEK_DAYS}
              placeholder={i18n.t('week_day')}
              isMulti
            />
          </Container>

          <Container className={classes.marginTop}>
            <Select
              theme={selectorColors}
              onChange={opinion => this.setState({ lessonTimes: opinion })}
              options={LESSONS_TIME}
              placeholder={i18n.t('lesson_time')}
              isMulti
            />
          </Container>

          <Container className={classes.marginTop}>
            <Select
              placeholder={i18n.t('week_number')}
              theme={selectorColors}
              isMulti
              onChange={opinion => this.setState({ weekNumbers: opinion })}
              options={WEEK_NUMBER}
            />
          </Container>

          <Container>
            <Grid container alignItems={'right'}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                className={classes.submit}
              >
                {i18n.t('upload')}
              </Button>
            </Grid>
          </Container>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.adminReducers.groups,
    universityId: state.authReducers.user.universityId,
    teachers: state.usersReducer.users,
    subjects: state.filesReducers.subjects,
    lectureHalls: state.lectureHallReducer.lectureHalls,
    buildings: state.lectureHallReducer.buildings
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddLesson);
