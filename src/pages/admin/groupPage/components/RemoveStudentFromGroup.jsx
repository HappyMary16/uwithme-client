import React from 'react';

import i18n from '../../../../locales/i18n';
import { getName } from '../../../../utils/UsersUtil';
import { Button, Modal } from 'react-bootstrap';

export function RemoveStudentFromGroup({open, student, handleNo, handleYes}) {
  return (
    <Modal show={open} onHide={handleNo} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('remove_student_from_group')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{getName(student)}</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleNo} variant={'purple'}>
          {i18n.t('no')}
        </Button>
        <Button
          onClick={() => {
            handleYes(student.id);
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
