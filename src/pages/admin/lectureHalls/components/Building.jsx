import React from 'react';
import { LectureHallsList } from './LectureHallsList';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListItem } from '../../structure/components/ListItem';

export const Building = ({ building, lectureHalls }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <ListGroup.Item action onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={building.label}
          icon={
            <img
              src="/department-icon.jpg"
              alt=""
              width="20"
              height="20"
              title="building"
            />
          }
        />
      </ListGroup.Item>
      <LectureHallsList lectureHalls={lectureHalls} open={open} />
    </div>
  );
};
