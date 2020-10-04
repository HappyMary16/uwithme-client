import React, { Component } from 'react';
import { GroupList } from './GroupList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Department extends Component {
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
    const { department, groups } = this.props;
    const { open } = this.state;

    return (
      <div className={'padding-left'}>
        <ListGroup.Item action
                        onClick={this.instituteHandleClick}>
          <Container>
            <Row>
              <Col xs={10}>
                <img src="/department-icon.jpg" alt="" width="20" height="20" title="Bootstrap"/>
                {' ' + department.label}
              </Col>
              <Col xs={2}>
                {open ? <ChevronUp class={'leftButton'}/> : <ChevronDown class={'leftButton'}/>}
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <GroupList open={open} groups={groups}/>
      </div>
    );
  }
}
