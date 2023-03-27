import React, {useState} from 'react';
import DepartmentsList from './DepartmentsList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../../common/components/ListItem';
import {InstituteIcon} from '../../../icons/InstituteIcon';

export default function Institute({institute, groups, departments}) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <ListGroup.Item action onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={institute.label}
          icon={<InstituteIcon/>}
        />
      </ListGroup.Item>

      <DepartmentsList
        open={open}
        groups={groups}
        departments={departments}
      />
    </div>
  );
}
