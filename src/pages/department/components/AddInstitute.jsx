import React from 'react';

import i18n from '../../../config/i18n';
import {Button, Form, Modal} from 'react-bootstrap';
import {useSaveDepartmentMutation} from "../../../store/department/departmentApiSlice";
import {useFetchUserQuery} from "../../../store/user/userApiSlice";
import {getId} from "../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";

export function AddInstitute({handleClose}) {

  const [saveDepartment] = useSaveDepartmentMutation();

  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;

  const [name, setInstituteName] = React.useState('');

  let onCreate = () => {
    saveDepartment({universityId, name});
    handleClose();
  };

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_institute')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Control
            placeholder={i18n.t('institute_name')}
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
