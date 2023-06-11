import {Button, Modal} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

export function Message({open, message, handleClose, description}) {

  const {t} = useTranslation();

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      {!!description && <Modal.Body>{description}</Modal.Body>}
      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
