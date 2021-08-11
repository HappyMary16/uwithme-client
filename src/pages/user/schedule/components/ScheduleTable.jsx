import React from "react";
import { Lesson } from "./Lesson";
import { LESSONS_TIME, WEEK_DAYS } from "../../../../constants/userRoles";
import { getCurrentWeek, getLesson } from "../../../../utils/ScheduleUtil";
import { history } from "../../../../store/Store";
import { USER_HOME_PAGE } from "../../../../constants/links";
import { getName } from "../../../../utils/UsersUtil";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { SwitchWeek } from "../../../common/components/SwitchWeek";
import { PersonFill } from "react-bootstrap-icons";

export const ScheduleTable = ({
  lessons,
  user,
  isMine,
  isEditMode = false,
  deleteLesson
}) => {
  let [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <div>
      <Row>
        {!isMine && (
          <Col xs={6} className="justify-content-center">
            <Row>
              <PersonFill
                size={"1.7em"}
                onClick={() => history.push(USER_HOME_PAGE(user.id))}
                className={"icon"}
              />
              <h5>{getName(user)}</h5>
            </Row>
          </Col>
        )}
        <Col
          xs={{ offset: isMine ? 9 : 3, span: 3 }}
          md={{ offset: isMine ? 10 : 4, span: 2 }}
          lg={{ offset: isMine ? 11 : 5, span: 1 }}
        >
          <SwitchWeek weekNumber={weekNumber} setWeekNumber={setWeekNumber} />
        </Col>
      </Row>

      <Table bordered responsive size="sm" className={"schedule-table"}>
        <thead>
          <tr>
            <th className={"schedule-th"}></th>
            {WEEK_DAYS.map(weekDay => (
              <th className={"schedule-th"} key={weekDay.value}>
                {weekDay.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LESSONS_TIME.map(lessonTime => (
            <tr key={lessonTime.value}>
              <th className={"schedule-th"}>
                {lessonTime.start}
                <br />
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
                  <td key={weekDay.value} className={"schedule-td"}>
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
    </div>
  );
};
