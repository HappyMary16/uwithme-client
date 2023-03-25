import React from 'react';
import i18n from '../../../../locales/i18n';
import { selectorColors } from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, Modal } from 'react-bootstrap';

export const AddLectureHall = ({
  buildings,
  open,
  handleClose,
  handleCreate
}) => {
  const [building, setBuilding] = React.useState();
  const [lectureHallName, setLectureHall] = React.useState();
  const [placeNumber, setPlaceNumber] = React.useState();

  let onCreate = () => {
    handleCreate(building.label, building.value, lectureHallName, placeNumber);
    handleClose();
    setLectureHall(null);
    setPlaceNumber(null);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_lecture_hall')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <CreatableSelect
            theme={selectorColors}
            className={'selector'}
            placeholder={i18n.t('building_name')}
            options={buildings}
            onChange={setBuilding}
            onCreateOption={e =>
              setBuilding({
                value: undefined,
                label: e
              })
            }
            value={building}
          />
          <Form.Control
            placeholder={i18n.t('lecture_hall_name')}
            onChange={e => setLectureHall(e.target.value)}
          />
          <Form.Control
            placeholder={i18n.t('place_number')}
            onChange={e => setPlaceNumber(e.target.value)}
            type={'number'}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={onCreate} variant={'purple'}>
          {i18n.t('create')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
