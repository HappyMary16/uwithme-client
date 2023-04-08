import React from 'react';
import i18n from '../../../../locales/i18n';
import {selectorColors} from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {Button, Form, Modal} from 'react-bootstrap';
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";
import {
  useFetchDepartmentsByUniversityIdQuery,
  useSaveDepartmentMutation
} from "../../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {getId} from "../../../../services/authService";

export function AddDepartment({handleClose}) {

  const [saveDepartment] = useSaveDepartmentMutation();

  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;
  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);

  const [institute, setInstitute] = React.useState();
  const [departmentName, setDepartmentName] = React.useState();

  let onCreate = () => {
    let instituteId = institute.value;
    if (instituteId === institute.label) {
      saveDepartment({universityId, name: institute.label})
        .then(response => saveDepartment({universityId, instituteId: response?.data?.id, name: departmentName}));
    } else {
      saveDepartment({universityId, instituteId, name: departmentName});
    }

    handleClose();
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_department')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <CreatableSelect
            theme={selectorColors}
            className={'selector'}
            placeholder={i18n.t('institute')}
            options={institutes}
            onChange={setInstitute}
            onCreateOption={e =>
              setInstitute({
                value: e,
                label: e
              })
            }
            value={institute}
          />
          <Form.Control
            placeholder={i18n.t('department_name')}
            onChange={e => setDepartmentName(e.target.value)}
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
