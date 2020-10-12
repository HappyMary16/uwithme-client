import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n';
import Select from 'react-select';
import { selectorColors } from '../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { LESSONS_TIME, WEEK_DAYS, WEEK_NUMBER } from '../../../constants/userRoles';
import { loadTeachersByUniversityId } from '../../users/actions';
import { loadSubjects } from '../../files/actions';
import { loadGroupsByUniversityId } from '../structure/actions';
import { loadBuildings, loadLectureHalls } from '../lectureHalls/actions';
import { getBuildingByLectureHall, getLectureHallsByBuilding } from '../../../utils/StructureUtils';
import { addLessonToSchedule } from './actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      dispatch(loadTeachersByUniversityId());
      dispatch(loadSubjects());
      dispatch(loadBuildings());
      dispatch(loadLectureHalls());

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
    const { teachers, lectureHalls, buildings, groups, subjects } = this.props;

    if (!filteredLectureHalls || filteredLectureHalls.length === 0) {
      filteredLectureHalls = lectureHalls;
    }

    return (
      <Container>
        <Form onSubmit={e => this.submit(e)}>
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
            className='margin-top'
            />

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
              className='margin-top'
            />

          <Row>
            <Col xs={6}>
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
                className='margin-top'
              />
            </Col>

            <Col xs={6}>
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
                className='margin-top'
              />
            </Col>
          </Row>

            <Select
              placeholder={i18n.t('groups')}
              theme={selectorColors}
              isMulti
              onChange={opinion => this.setState({ selectedGroups: opinion })}
              options={groups}
              className='margin-top'
            />

            <Select
              theme={selectorColors}
              onChange={opinion => this.setState({ weekDays: opinion })}
              options={WEEK_DAYS}
              placeholder={i18n.t('week_day')}
              isMulti
              className='margin-top'
            />

            <Select
              theme={selectorColors}
              onChange={opinion => this.setState({ lessonTimes: opinion })}
              options={LESSONS_TIME}
              placeholder={i18n.t('lesson_time')}
              isMulti
              className='margin-top'
            />

            <Select
              placeholder={i18n.t('week_number')}
              theme={selectorColors}
              isMulti
              onChange={opinion => this.setState({ weekNumbers: opinion })}
              options={WEEK_NUMBER}
              className='margin-top'
            />

          <Col xs={12} md={{ offset: 9, span: 3 }}>
            <Button
              block
              type={'submit'}
              variant={'purple'}
              className='margin-top'
            >
              {i18n.t('upload')}
            </Button>
          </Col>
        </Form>
      </Container>
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

export default connect(mapStateToProps)(AddLesson);
