import React from 'react';
import {getLectureHallsByBuilding} from '../../../utils/StructureUtils';
import {Building} from './Building';
import {ListGroup} from 'react-bootstrap';

export function BuildingsList({ buildings, lectureHalls, classes }) {
  return (
    <ListGroup variant='flush'>
      {buildings && buildings.map((building, i) => (
        <Building building={building}
                  lectureHalls={getLectureHallsByBuilding(lectureHalls, building)}
                  classes={classes}
                  key={i}/>
      ))}
    </ListGroup>
  );
}
