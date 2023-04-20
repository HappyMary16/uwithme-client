import React from 'react';
import i18n from '../../../locales/i18n';
import {GROUP_SCHEDULE, USER_HOME_PAGE} from '../../../constants/links';
import {Card, Col, Form, Row} from 'react-bootstrap';
import {CalendarWeekFill, PencilFill} from 'react-bootstrap-icons';
import {useNavigate} from "react-router-dom";
import {getName} from "../../../utils/UsersUtil";

export function GroupCard({group, department, institute, groupTeacher, openGroupDialog}) {
  const navigate = useNavigate();

  return (
    <Card className={"margin-bottom"}>
      <Card.Header as="h5">
        <Row>
          <Col xs={8} md={10}>
            {group.label}
          </Col>
          <Col xs={4} sm={3} md={2}>
            <div className={'d-flex flex-row justify-content-end'}>
              <PencilFill className={"icon"} onClick={openGroupDialog}/>
              <CalendarWeekFill className={"icon"} onClick={() => navigate(GROUP_SCHEDULE(group.value))}/>
            </div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>
          {i18n.t("teacher") + ": "}
          {groupTeacher && (
            //TODO verify it with teacher
            <Card.Link onClick={() => navigate(USER_HOME_PAGE(groupTeacher.id))}>
              {getName(groupTeacher)}
            </Card.Link>
          )}
          {!groupTeacher && i18n.t("group_does_not_have_teacher")}
        </Card.Subtitle>
        <Card.Text>
          {i18n.t("institute")}: {institute?.label}
          <br/>
          {i18n.t("department")}: {department?.label}
          <br/>
          {i18n.t("start_year")}: {group?.startYear}
        </Card.Text>
        <Form.Check
          type={"checkbox"}
          label={i18n.t("show_in_registration")}
          checked={group.visible}
          disabled
        />
      </Card.Body>
    </Card>
  );
}
