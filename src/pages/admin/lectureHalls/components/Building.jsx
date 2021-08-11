import React from "react";
import { LectureHallsList } from "./LectureHallsList";
import ListGroup from "react-bootstrap/ListGroup";
import { ListItem } from "../../structure/components/ListItem";
import { DepartmentIcon } from "../../../icons/DepartmentIcon";

export const Building = ({ building, lectureHalls }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <ListGroup.Item action onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={building.label}
          icon={<DepartmentIcon size={"1.9em"} />}
        />
      </ListGroup.Item>
      <LectureHallsList lectureHalls={lectureHalls} open={open} />
    </div>
  );
};
