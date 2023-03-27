import React from 'react';
import { getName } from '../../../../utils/UsersUtil';
import { USER_HOME_PAGE } from '../../../../constants/links';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { SmallAvatar } from '../../../common/components/SmallAvatar';
import {useNavigate} from "react-router-dom";

export function Student({ student, removeStudent }) {

  const navigate = useNavigate();

  let handleClick = () => {
    navigate(USER_HOME_PAGE(student.id));
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Row>
        <Col xs={2} sm={1}>
          <SmallAvatar avatar={student.avatar} />
        </Col>
        <Col xs={8} sm={10}>
          {getName(student)}
        </Col>
        <Col xs={2} sm={1}>
          <TrashFill
            onClick={e => {
              e.stopPropagation();
              removeStudent(student);
            }}
            className={"delete-icon icon"}
            size={"1.6em"}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
