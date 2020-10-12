import React from 'react';
import { Lesson } from './Lesson';
import { LESSONS_TIME, WEEK_DAYS } from '../../../../constants/userRoles';
import Switch from 'react-switch';
import { lightGreyColor } from '../../../../styles/styles';
import { getCurrentWeek, getLesson } from '../../../../utils/ScheduleUtil';
import i18n from '../../../../locales/i18n';
import { history } from '../../../../store/Store';
import { USER_HOME_PAGE } from '../../../../constants/links';
import { getName } from '../../../../utils/UsersUtil';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const ScheduleTable = ({
                                lessons,
                                user,
                                isMine,
                                isEditMode = false,
                                deleteLesson
                              }) => {
  let [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <Container>
      <Row>
        {!isMine && (
          <Col xs={6}>
            <Button
              onClick={() => history.push(USER_HOME_PAGE(user.id))}
              variant="purple"
              size="medium"
            >
              {getName(user)}
            </Button>
          </Col>
        )}
        <Col
          xs={{ offset: isMine ? 9 : 3, span: 3 }}
          md={{ offset: isMine ? 10 : 4, span: 2 }}
          lg={{ offset: isMine ? 11 : 45, span: 1 }}
        >
          {i18n.t('week')}
          <Switch
            offColor={lightGreyColor}
            onColor={lightGreyColor}
            checked={weekNumber}
            onChange={() => setWeekNumber(!weekNumber)}
            uncheckedIcon={<div className={'switch-week'}>2</div>}
            checkedIcon={<div className={'switch-week'}>1</div>}
            className="react-switch"
            id="icon-switch"
          />
        </Col>
      </Row>

      <Table bordered responsive={'md'}>
        <thead>
        <tr>
          <th></th>
          {WEEK_DAYS.map(weekDay => (
            <th key={weekDay.value}>{weekDay.label}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {LESSONS_TIME.map(lessonTime => (
          <tr key={lessonTime.value}>
            <th>
              {lessonTime.start}
              <br/>
              {lessonTime.end}
            </th>
            {WEEK_DAYS.map(weekDay => {
              let lesson = getLesson(
                lessons,
                weekDay.value,
                lessonTime.value,
                weekNumber ? 1 : 2
              );
              return (
                <td key={weekDay.value}>
                  {lesson && (
                    <Lesson
                      lesson={lesson}
                      user={user}
                      isEditMode={isEditMode}
                      deleteLesson={deleteLesson}
                    />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
};
