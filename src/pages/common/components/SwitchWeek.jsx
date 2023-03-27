import React from 'react';
import Switch from 'react-switch';
import { lightGreyColor } from '../../../styles/styles';
import { Row } from 'react-bootstrap';

export function SwitchWeek({ weekNumber, setWeekNumber }) {
  return (
    <Row className="justify-content-end switch-week-margin">
      <Switch
        offColor={lightGreyColor}
        onColor={lightGreyColor}
        checked={weekNumber}
        onChange={() => setWeekNumber(!weekNumber)}
        uncheckedIcon={<div>Тиждень 2</div>}
        checkedIcon={<div>Тиждень 1</div>}
        width={120}
        activeBoxShadow={'0 0 2px 3px #5c71c5'}
        className="react-switch"
        id="icon-switch"
      />
    </Row>
  );
}
