import React from 'react';
import List from '@material-ui/core/List';
import { getLectureHallsByBuilding } from '../../../../utils/StructureUtils';
import { Building } from './Building';

export const BuildingsList = ({ buildings, lectureHalls, classes }) => {
  return (
    <List component='nav' className={classes.list}>
      {buildings && buildings.map(building => (
        <Building building={building}
                  lectureHalls={getLectureHallsByBuilding(lectureHalls, building)}
                  classes={classes}/>
      ))}
    </List>
  );
};
