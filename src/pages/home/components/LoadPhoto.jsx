import React, {useState} from 'react';
import i18n from '../../../config/i18n';
import '../../../styles/fileUpload.css';
import AvatarEditor from 'react-avatar-editor';
import {Button, Form, Modal, Row} from 'react-bootstrap';

export default function LoadPhoto({open, onSave, onClose}) {

  const [photo, setPhoto] = useState({});
  const [editorRef, setEditorRef] = useState();

  function handleClose() {
    setPhoto({});
    onClose();
  }

  function onFileAdded(e) {
    setPhoto(e.target.files[0]);
  }

  function handleSave() {
    setPhoto({});

    if (editorRef) {
      editorRef.getImageScaledToCanvas().toBlob(onSave);
    }
  }

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Row className="align-items-center flex-column">
        <Form>
          <Form.Control
            type="file"
            label="Custom file input"
            onChange={onFileAdded}
          />
          <div className={'padding-one'}>
            <AvatarEditor
              ref={setEditorRef}
              image={photo}
              width={200}
              height={200}
              color={[200, 200, 200, 0.6]} // RGBA
              scale={1.2}
              borderRadius={100}
              onDropFile={onFileAdded}
            />
          </div>
        </Form>
      </Row>

      <Modal.Footer>
        <Button onClick={handleSave} variant={'purple'}>
          {i18n.t('save')}
        </Button>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
