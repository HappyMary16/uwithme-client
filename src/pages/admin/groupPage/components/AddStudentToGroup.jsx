import React from 'react';

import i18n from '../../../../locales/i18n';
import Select from 'react-select';
import {selectorColors} from '../../../../styles/styles';
import {getName} from '../../../../utils/UsersUtil';
import {Button, Modal} from 'react-bootstrap';
import {useFetchUsersQuery} from "../../../../store/user/userApiSlice";

export default function AddStudentToGroup({ open, handleClose, handleAdd }) {

  const {data: students} = useFetchUsersQuery({hasGroup: false})
  const [selectedStudents, setStudents] = React.useState('');

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('add_student_to_group')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className={'margin-bottom'}>{i18n.t('select_student')}</p>
        <Select
          theme={selectorColors}
          onChange={setStudents}
          options={
            students &&
            students.map(s => {
              return {
                value: s.id,
                label: getName(s)
              };
            })
          }
          isMulti
          placeholder={i18n.t('student')}
          menuPlacement={'auto'}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button
          onClick={() => {
            handleAdd(selectedStudents.map(s => s.value));
            handleClose();
          }}
          variant={'purple'}
        >
          {i18n.t('add')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
