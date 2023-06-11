import i18n from '../../../config/i18n';
import {Button, Modal} from 'react-bootstrap';

export function Message({open, message, handleClose, description}) {
  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      {!!description && <Modal.Body>{description}</Modal.Body>}
      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
