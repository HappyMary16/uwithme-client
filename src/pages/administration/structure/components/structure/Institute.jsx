import React, { Component } from 'react';
import DepartmentsList from './DepartmentsList';
import ListGroup from 'react-bootstrap/ListGroup';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Institute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.someAction = this.someAction.bind(this);
    this.instituteHandleClick = this.instituteHandleClick.bind(this);
  }

  instituteHandleClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { institute, groups, departments } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ListGroup.Item action onClick={this.instituteHandleClick}>
          <Container>
            <Row>
              <Col xs={10}>
                <img src="/institute-icon.png" alt="" width="20" height="20" title="Bootstrap"/>
                {' ' + institute.label}
              </Col>
              <Col xs={2}>
                {open ? <ChevronUp class={'leftButton'}/> : <ChevronDown class={'leftButton'}/>}
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>

        <DepartmentsList
          open={open}
          groups={groups}
          departments={departments}
        />
      </div>
    );
  }
}
