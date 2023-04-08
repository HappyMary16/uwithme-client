import React from 'react';
import Department from './Department';
import {Collapse, ListGroup} from 'react-bootstrap';

export default function DepartmentsList({departments, open}) {

  return (
    <Collapse in={open}>
      <ListGroup>
        {departments && departments.map((department, i) => (
          <Department
            key={i}
            department={department}
          />
        ))}
      </ListGroup>
    </Collapse>
  );
}
