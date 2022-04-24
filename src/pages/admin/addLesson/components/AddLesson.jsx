import React, { Component } from 'react';
import i18n from '../../../../locales/i18n';
import Select from 'react-select';
import { selectorColors } from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { LESSONS_TIME, WEEK_DAYS, WEEK_NUMBER } from '../../../../constants/userRoles';
import { getBuildingByLectureHall, getLectureHallsByBuilding } from '../../../../utils/StructureUtils';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getName } from '../../../../utils/UsersUtil';

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

    this.addLessons = this.addLessons.bind(this);
  }

  addLessons(e) {
    e.preventDefault();

    const { submit } = this.props;
    submit(this.state);
  }

  render() {
    let { filteredLectureHalls, lectureHall, building } = this.state;
    const {
      teachers,
      lectureHalls,
      buildings,
      groups,
      subjects,
      isTeacher
    } = this.props;

    if (!filteredLectureHalls || filteredLectureHalls.length === 0) {
      filteredLectureHalls = lectureHalls;
    }

    return (
      <Form onSubmit={this.addLessons}>
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
          onChange={opinion => this.setState({ subject: opinion })}
          className={'selector'}
        />
        {!isTeacher && (
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
            onChange={opinion => this.setState({ teacher: opinion })}
            className={'selector'}
          />
        )}

        <Select
          placeholder={i18n.t('groups')}
          theme={selectorColors}
          isMulti
          onChange={opinion => this.setState({ selectedGroups: opinion })}
          options={groups}
          className={'selector'}
        />

        <Select
          theme={selectorColors}
          onChange={opinion => this.setState({ weekDays: opinion })}
          options={WEEK_DAYS}
          placeholder={i18n.t('week_day')}
          isMulti
          className={'selector'}
        />

        <Select
          theme={selectorColors}
          onChange={opinion => this.setState({ lessonTimes: opinion })}
          options={LESSONS_TIME}
          placeholder={i18n.t('lesson_time')}
          isMulti
          className={'selector'}
        />

        <Select
          placeholder={i18n.t('week_number')}
          theme={selectorColors}
          isMulti
          onChange={opinion => this.setState({ weekNumbers: opinion })}
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
                let lectureHallsForBuilding = getLectureHallsByBuilding(
                  lectureHalls,
                  opinion
                );
                this.setState({
                  building: opinion,
                  filteredLectureHalls: lectureHallsForBuilding,
                  lectureHall: lectureHallsForBuilding.includes(lectureHall)
                    ? lectureHall
                    : null
                });
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
              onChange={opinion => {
                this.setState({
                  lectureHall: opinion,
                  building: getBuildingByLectureHall(buildings, opinion),
                  filteredLectureHalls: getLectureHallsByBuilding(
                    lectureHalls,
                    opinion
                  )
                });
              }}
              className={'selector'}
            />
          </Col>
        </Row>

        <Col xs={12} md={{ offset: 9, span: 3 }}>
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
}

export default AddLesson;
