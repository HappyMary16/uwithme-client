import React from "react";
import Switch from "react-switch";
import { lightGreyColor } from "../../../styles/styles";
import { Row } from "react-bootstrap";

export const SwitchWeek = ({ weekNumber, setWeekNumber }) => {
  return (
    <Row className="align-items-center flex-column">
      <Switch
        offColor={lightGreyColor}
        onColor={lightGreyColor}
        checked={weekNumber}
        onChange={() => setWeekNumber(!weekNumber)}
        uncheckedIcon={<div className={"switch-week"}>2</div>}
        checkedIcon={<div className={"switch-week"}>1</div>}
        className="react-switch"
        id="icon-switch"
      />
    </Row>
  );
};
