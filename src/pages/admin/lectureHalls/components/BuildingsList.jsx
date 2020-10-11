import React from 'react';
import { getLectureHallsByBuilding } from '../../../../utils/StructureUtils';
import { Building } from './Building';
import ListGroup from 'react-bootstrap/ListGroup';

export const BuildingsList = ({ buildings, lectureHalls, classes }) => {
  return (
    <ListGroup variant='flush'>
      {buildings && buildings.map(building => (
        <Building building={building}
                  lectureHalls={getLectureHallsByBuilding(lectureHalls, building)}
                  classes={classes}/>
      ))}
    </ListGroup>
  );
};
