import React from 'react';

import i18n from '../../../config/i18n';
import {Button, Modal} from 'react-bootstrap';

export function RemoveDepartment({department, handleNo, handleYes}) {
  return (
    <Modal show={true} onHide={handleNo} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('remove_department')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{department.label}</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleNo} variant={'purple'}>
          {i18n.t('no')}
        </Button>
        <Button
          onClick={() => {
            handleYes();
            handleNo();
          }}
          variant={'purple'}
        >
          {i18n.t('yes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}