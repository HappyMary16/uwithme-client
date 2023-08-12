import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {getName} from '../../../utils/UsersUtil';
import {Button, Modal} from 'react-bootstrap';
import {useFetchUsersQuery} from "../../../store/user/userApiSlice";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export default function AddStudentToGroup({ open, handleClose, handleAdd }) {

  const {t, i18n} = useTranslation("group");

  const {data: students} = useFetchUsersQuery({hasGroup: false})
  const [selectedStudents, setStudents] = useState('');

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{t('add_student_to_group')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className={'margin-bottom'}>{t('select_student')}</p>
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
          placeholder={t('student')}
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
