import React from 'react';
import { LectureHallsList } from './LectureHallsList';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';

export const Building = ({ building, lectureHalls, classes }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <ListGroup.Item button onClick={() => setOpen(!open)}>
        <Container>
          <Row>
            <Col xs={10}>
              <img src="/department-icon.jpg" alt="" width="20" height="20" title="Bootstrap"/>
              {' ' + building.label}
            </Col>
            <Col xs={2}>
              {open ? <ChevronUp class={'leftButton'}/> : <ChevronDown class={'leftButton'}/>}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
      <LectureHallsList lectureHalls={lectureHalls}
                        open={open}
                        classes={classes}/>
    </div>
  );
};
