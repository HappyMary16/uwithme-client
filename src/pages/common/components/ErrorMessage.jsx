import {Button, Modal} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

export function ErrorMessage({ error, handleClose }) {

  const {t} = useTranslation();

  return (
    <Modal show={true} onHide={() => handleClose(error.id)} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{!!error && error.message}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={() => handleClose(error.id)} variant={'purple'}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
