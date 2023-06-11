import {Button, Modal} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

export function RemoveDepartment({department, handleNo, handleYes}) {

  const {t, i18n} = useTranslation("department");

  return (
    <Modal show={true} onHide={handleNo} centered>
      <Modal.Header>
        <Modal.Title>{t('remove_department')}</Modal.Title>
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