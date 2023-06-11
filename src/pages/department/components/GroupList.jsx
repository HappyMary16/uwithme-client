import {Col, Collapse, ListGroup, Row} from 'react-bootstrap';
import {GROUP_PAGE} from '../../../constants/links';
import {PeopleFill} from 'react-bootstrap-icons';
import {useNavigate} from "react-router-dom";

export function GroupList({ groups, open }) {

  const navigate = useNavigate();

  return (
    <Collapse in={open}>
      <ListGroup variant={'flush'}>
        {groups && groups.map((group, i) => (
          <ListGroup.Item
            className={"padding-left-x2"}
            key={i}
            action
            onClick={() => navigate(GROUP_PAGE(group.value))}
          >
            <Row>
              <Col xs={2} sm={1}>
                <Row className="justify-content-center">
                  <PeopleFill className={"icon-color"}/>
                </Row>
              </Col>
              <Col>{group.label}</Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
}
