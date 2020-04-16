import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../../locales/i18n';
import { selectorColors } from '../../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { number } from 'prop-types';

export const AddLectureHall = ({ buildings, open, handleClose, handleCreate }) => {
  const [building, setBuilding] = React.useState();
  const [lectureHallName, setLectureHall] = React.useState();
  const [placeNumber, setPlaceNumber] = React.useState();

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{i18n.t('create_lecture_hall')}</DialogTitle>
      <DialogContent>

        <DialogContentText>
          {i18n.t('select_building')}
        </DialogContentText>
        <CreatableSelect
          theme={selectorColors}
          placeholder={i18n.t('building_name')}
          options={buildings}
          onChange={setBuilding}
          onCreateOption={(e) => setBuilding({
            value: e,
            label: e
          })}
          value={building}
        />

        <DialogContentText>
          {i18n.t('input_lecture_hall_name')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={i18n.t('lecture_hall_name')}
          fullWidth
          onChange={(e) => setLectureHall(e.target.value)}
        />

        <DialogContentText>
          {i18n.t('input_place_number')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={i18n.t('place_number')}
          fullWidth
          type={number}
          onChange={(e) => setPlaceNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {i18n.t('cancel')}
        </Button>
        <Button onClick={() => {
          handleCreate(building.label, building.value, lectureHallName, placeNumber);
          handleClose();
        }} color="primary">
          {i18n.t('create')}
        </Button>
      </DialogActions>

    </Dialog>
  );
};
