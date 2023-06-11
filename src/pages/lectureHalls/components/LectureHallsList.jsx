import i18n from '../../../config/i18n';
import {Col, Collapse, ListGroup, Row} from 'react-bootstrap';
import {DoorOpenFill} from 'react-bootstrap-icons';

export function LectureHallsList({ lectureHalls, open }) {
  return (
    <Collapse in={open}>
      <ListGroup variant={'flush'}>
        {lectureHalls &&
          lectureHalls.map((lectureHall, i) => (
            <ListGroup.Item className={"padding-left"} key={i}>
              <Row>
                <Col xs={2} sm={1}>
                  <Row className="justify-content-center">
                    <DoorOpenFill className={"icon-color margin-top"}/>
                  </Row>
                </Col>
                <Col>
                  <p className={"text"}>{lectureHall.label}</p>
                  <p className={"secondary-text text"}>
                    {i18n.t("place_number") + ": " + lectureHall.placeNumber}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Collapse>
  );
}
