import React from 'react';
import i18n from '../../../config/i18n';
import {selectorColors} from '../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {Button, Form, Modal} from 'react-bootstrap';
import {useFetchUserQuery} from "../../../store/user/userApiSlice";
import {getId} from "../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchBuildingsQuery, useSaveBuildingMutation} from "../../../store/lecturehall/buildingApiSlice";
import {useSaveLectureHallMutation} from "../../../store/lecturehall/lectureHallApiSlice";

export function AddLectureHall({handleClose}) {

  const [saveBuilding] = useSaveBuildingMutation();
  const [saveLectureHall] = useSaveLectureHallMutation();

  const {data: buildings} = useFetchBuildingsQuery();
  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;

  const [building, setBuilding] = React.useState();
  const [lectureHallName, setLectureHall] = React.useState({});
  const [placeNumber, setPlaceNumber] = React.useState({});

  let onCreate = () => {
    if (building.label === building.value) {
      saveBuilding({universityId, name: building.label})
        .then(response => saveLectureHall({
          universityId,
          buildingId: response?.data?.id,
          name: lectureHallName,
          placeNumber
        }));
    } else {
      saveLectureHall({
        universityId,
        buildingId: building.value,
        name: lectureHallName,
        placeNumber
      });
    }

    handleClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
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
                value: e,
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
}
