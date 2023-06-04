import React, {useEffect, useState} from 'react';
import i18n from '../../config/i18n';
import Select from 'react-select';
import {selectorColors} from '../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {LESSONS_TIME, TEACHER, WEEK_DAYS, WEEK_NUMBER} from '../../constants/userRoles';
import {getLectureHallsByBuilding} from '../../utils/StructureUtils';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {getName} from '../../utils/UsersUtil';
import {useSelector} from "react-redux";
import {useFetchUserQuery, useFetchUsersQuery} from "../../store/user/userApiSlice";
import {selectActiveRole} from "../../store/user/authSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchLectureHallsQuery} from "../../store/lecturehall/lectureHallApiSlice";
import {useFetchBuildingsQuery} from "../../store/lecturehall/buildingApiSlice";
import {useFetchGroupsQuery} from "../../store/group/groupApiSlice";
import {useSaveLessonsMutation} from "../../store/lesson/lessonApiSlice";
import {useFetchSubjectsByUserIdQuery, useFetchSubjectsQuery} from "../../store/subject/subjectApiSlice";

export default function AddLesson() {

  const [saveLessons] = useSaveLessonsMutation();

  const {data: user} = useFetchUserQuery(getId() ?? skipToken);

  const role = useSelector(selectActiveRole);
  const {data: teachers} = useFetchUsersQuery({role: TEACHER});
  const {data: groups} = useFetchGroupsQuery();
  const {data: teacherSubjects} = useFetchSubjectsByUserIdQuery(role === TEACHER ? getId() ?? skipToken : skipToken)
  const {data: subjects} = useFetchSubjectsQuery(role === TEACHER && skipToken)
  const {data: lectureHalls} = useFetchLectureHallsQuery();
  const {data: buildings} = useFetchBuildingsQuery();

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
    if (user && role === TEACHER) {
      setTeacher({value: user.id})
    }
  }, [user, role]);

  function addLessons(e) {
    e.preventDefault();

    let lessons = {
      subjectId: subject.value === subject.label ? null : subject.value,
      subjectName: subject.label,
      teacherId: teacher.value === teacher.label ? null : teacher.value,
      teacherName: teacher.label,
      lectureHall: lectureHall.value,
      groups: selectedGroups.map(group => group.value),
      weekDays: weekDays.map(weekDay => weekDay.value),
      lessonTimes: lessonTimes.map(lessonTime => lessonTime.value),
      weekNumbers: weekNumbers.map(weekNumber => weekNumber.value)
    };

    saveLessons(lessons);
  }

  function getSubjects() {
    if (role === TEACHER) {
      return teacherSubjects ?? [];
    }
    return subjects ?? [];
  }

  return (
    <Form onSubmit={addLessons}>
      <CreatableSelect
        theme={selectorColors}
        placeholder={i18n.t('subject')}
        options={
          getSubjects().map(subject => {
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
        <Button type={'submit'} variant={'purple'} className={'selector'}>
          {i18n.t('upload')}
        </Button>
      </Col>
    </Form>
  );
}