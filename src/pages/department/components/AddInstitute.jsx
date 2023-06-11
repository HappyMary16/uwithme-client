import {Button, Form, Modal} from 'react-bootstrap';
import {useSaveDepartmentMutation} from "../../../store/department/departmentApiSlice";
import {useFetchUserQuery} from "../../../store/user/userApiSlice";
import {getId} from "../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function AddInstitute({handleClose}) {

  const {t, i18n} = useTranslation("department");
  const [saveDepartment] = useSaveDepartmentMutation();

  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;

  const [name, setInstituteName] = useState('');

  let onCreate = () => {
    saveDepartment({universityId, name});
    handleClose();
  };

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{t('create_institute')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Control
            placeholder={t('institute_name')}
            onChange={e => setInstituteName(e.target.value)}
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
