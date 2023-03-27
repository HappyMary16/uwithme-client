import React, {useState} from 'react';
import {GroupList} from './GroupList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../../common/components/ListItem';
import {DepartmentIcon} from '../../../icons/DepartmentIcon';

export default function Department({department, groups}) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <ListGroup.Item
        className={"padding-left"}
        action
        onClick={() => setOpen(!open)}
      >
        <ListItem
          open={open}
          text={department.label}
          icon={<DepartmentIcon/>}
        />
      </ListGroup.Item>

      <GroupList open={open} groups={groups}/>
    </div>
  );
}
