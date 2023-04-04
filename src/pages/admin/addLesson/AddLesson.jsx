import React, {useEffect, useState} from 'react';
import i18n from '../../../locales/i18n';
import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {LESSONS_TIME, TEACHER, WEEK_DAYS, WEEK_NUMBER} from '../../../constants/userRoles';
import {getLectureHallsByBuilding} from '../../../utils/StructureUtils';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {getName} from '../../../utils/UsersUtil';
import {useDispatch, useSelector} from "react-redux";
import {useFetchUserQuery} from "../../../store/auth/authApiSlice";
import {loadGroupsByUniversityId} from "../../../actions/groupActions";
import {loadSubjects} from "../../../actions/fileActions";
import {loadBuildings, loadLectureHalls} from "../../../actions/lectureHallActions";
import {addLessonToSchedule} from "../../../actions/scheduleActions";
import {selectActiveRole} from "../../../store/auth/authSlice";
import {useFetchUsersQuery} from "../../../store/user/userApiSlice";

export default function AddLesson() {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;
  const universityId = user.universityId;

  const role = useSelector(selectActiveRole);
  const {data: teachers} = useFetchUsersQuery(TEACHER);
  const groups = useSelector(state => Object.values(state.groupReducers.groups));
  const subjects = useSelector(state => state.filesReducers.subjects)
  const lectureHalls = useSelector(state => Object.values(state.lectureHallReducers.lectureHalls))
  const buildings = useSelector(state => Object.values(state.lectureHallReducers.buildings))

  const [subject, setSubject] = useState({});
  const [teacher, setTeacher] = useState(role === TEACHER ? user : {});
  const [building, setBuilding] = useState();
  const [lectureHall, setLectureHall] = useState();
  const [filteredLectureHalls, setFilteredLectureHalls] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [lessonTimes, setLessonTimes] = useState([]);
  const [weekNumbers, setWeekNumbers] = useState([]);

  useEffect(() => {
    if (role === TEACHER) {
      dispatch(loadSubjects(user.userId));
    } else {
      dispatch(loadSubjects());
    }

    if (universityId) {
      dispatch(loadGroupsByUniversityId(universityId));
      dispatch(loadBuildings());
      dispatch(loadLectureHalls());
    }

    //TODO
    // load lessons time (feature)
  }, [universityId, user, role, dispatch]);

  function addLessons(e) {
    e.preventDefault();

    dispatch(
      addLessonToSchedule(
        subject.value,
        subject.label,
        teacher.value,
        teacher.label,
        lectureHall.value,
        selectedGroups,
        weekDays,
        lessonTimes,
        weekNumbers
      )
    );
  }

  return (
    <Form onSubmit={addLessons}>
      <CreatableSelect
        theme={selectorColors}
        placeholder={i18n.t('subject')}
        options={
          subjects &&
          subjects.map(subject => {
            return {
              label: subject.name,
              value: subject.id
            };
          })
        }
        onChange={opinion => setSubject(opinion)}
        className={'selector'}
      />
      {role !== TEACHER && (
        <CreatableSelect
          theme={selectorColors}
          placeholder={i18n.t('teacher')}
          options={
            teachers &&
            teachers.map(s => {
              return {
                value: s.id,
                label: getName(s)
              };
            })
          }
          onChange={opinion => setTeacher(opinion)}
          className={'selector'}
        />
      )}

      <Select
        placeholder={i18n.t('groups')}
        theme={selectorColors}
        isMulti
        onChange={opinion => setSelectedGroups(opinion)}
        options={groups}
        className={'selector'}
      />

      <Select
        theme={selectorColors}
        onChange={opinion => setWeekDays(opinion)}
        options={WEEK_DAYS}
        placeholder={i18n.t('week_day')}
        isMulti
        className={'selector'}
      />

      <Select
        theme={selectorColors}
        onChange={opinion => setLessonTimes(opinion)}
        options={LESSONS_TIME}
        placeholder={i18n.t('lesson_time')}
        isMulti
        className={'selector'}
      />

      <Select
        placeholder={i18n.t('week_number')}
        theme={selectorColors}
        isMulti
        onChange={opinion => setWeekNumbers(opinion)}
        options={WEEK_NUMBER}
        className={'selector'}
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
              setBuilding(building);
              setFilteredLectureHalls(lectureHallsForBuilding);
              setLectureHall(lectureHallsForBuilding.includes(lectureHall) ? lectureHall : null);
            }}
            className={'selector'}
          />
        </Col>

        <Col xs={6}>
          <Select
            value={lectureHall}
            theme={selectorColors}
            placeholder={i18n.t('lecture_hall')}
            options={filteredLectureHalls}
            onChange={opinion => setLectureHall(opinion)}
            className={'selector'}
          />
        </Col>
      </Row>

      <Col xs={12} md={{offset: 9, span: 3}}>
        <Button
          block
          type={'submit'}
          variant={'purple'}
          className={'selector'}
        >
          {i18n.t('upload')}
        </Button>
      </Col>
    </Form>
  );
}