import {Fragment, useState} from 'react';
import {LectureHallsList} from './LectureHallsList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../common/components/ListItem';
import {DepartmentIcon} from '../../../icons/DepartmentIcon';

export function Building({ building, lectureHalls }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <ListGroup.Item key={building.id} action onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={building.label}
          icon={<DepartmentIcon/>}
        />
      </ListGroup.Item>
      <LectureHallsList lectureHalls={lectureHalls} open={open} />
    </Fragment>
  );
}
