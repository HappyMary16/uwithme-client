import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';
import { history } from '../../../../../store/Store';
import { GROUP_PAGE } from '../../../../../constants/links';
import { PeopleFill } from 'react-bootstrap-icons';

export const GroupList = ({ groups, open }) => {
  return (
    <Collapse in={open}>
      <ListGroup className={'padding-left'}>
        {groups.map((group, i) => (
          <ListGroup.Item key={i}
                          action
                          onClick={() => history.push(GROUP_PAGE(group.value))}>
            <PeopleFill/>
            {' ' + group.label}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
};
