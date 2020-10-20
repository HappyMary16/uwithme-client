import React from 'react';

import i18n from '../../../../locales/i18n';
import { selectorColors } from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const AddDepartment = ({
  institutes,
  open,
  handleClose,
  handleCreate
}) => {
  const [institute, setInstitute] = React.useState();
  const [departmentName, setDepartmentName] = React.useState();

  let onCreate = () => {
    handleCreate(institute.label, institute.value, departmentName);
    handleClose();
    setInstitute(null);
    setDepartmentName(null);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
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
};
