import React from "react";
import i18n from "../../../../locales/i18n";
import { history } from "../../../../store/Store";
import { GROUP_SCHEDULE, USER_HOME_PAGE } from "../../../../constants/links";
import Card from "react-bootstrap/Card";
import { CalendarWeekFill } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export const GroupCard = ({ group, groupTeacher }) => {
  return (
    <Card className={"margin-bottom"}>
      <Card.Header as="h5">
        <Row>
          <Col xs={10} md={11}>
            {group.label}
          </Col>
          <Col xs={2} md={1}>
            <CalendarWeekFill
              className={"icon"}
              size={"1.3em"}
              onClick={() => history.push(GROUP_SCHEDULE(group.value))}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>
          {i18n.t("teacher") + ": "}
          {groupTeacher && (
            //TODO verify it with teacher
            <Card.Link
              onClick={() => history.push(USER_HOME_PAGE(groupTeacher.id))}
            >
              getName(groupTeacher)
            </Card.Link>
          )}
          {!groupTeacher && i18n.t("group_does_not_have_teacher")}
        </Card.Subtitle>
        <Card.Text>
          {i18n.t("institute")}: {group.instituteName}
          <br />
          {i18n.t("department")}: {group.departmentName}
          <br />
          {i18n.t("course")}: {group.course}
        </Card.Text>
        <Form.Check
          type={"checkbox"}
          label={i18n.t("show_in_registration")}
          checked={group.isShowingInRegistration}
          disabled
        />
      </Card.Body>
    </Card>
  );
};
