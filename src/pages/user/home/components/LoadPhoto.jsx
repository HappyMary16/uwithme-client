import React, { Component } from 'react';
import i18n from '../../../../locales/i18n';
import '../../../../styles/fileUpload.css';
import AvatarEditor from 'react-avatar-editor';
import { Button, Form, Modal, Row } from 'react-bootstrap';

class LoadPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.onFileAdded = this.onFileAdded.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
  }

  handleClose() {
    const { onClose } = this.props;
    this.setState({
      photo: {}
    });
    onClose();
  }

  onFileAdded(e) {
    const file = e.target.files;

    this.setState({
      photo: file[0]
    });
  }

  setEditorRef = editor => (this.editor = editor);

  handleSave = () => {
    const { onSave } = this.props;

    this.setState({
      photo: {}
    });

    if (this.editor) {
      this.editor.getImageScaledToCanvas().toBlob(onSave);
    }
  };

  render() {
    const { open } = this.props;
    const { photo } = this.state;

    return (
      <Modal show={open} onHide={this.handleClose} centered>
        <Row className="align-items-center flex-column">
          <Form>
            <Form.File
              custom
              label="Custom file input"
              onChange={this.onFileAdded}
            />
            <div className={'padding-one'}>
              <AvatarEditor
                ref={this.setEditorRef}
                image={photo}
                width={200}
                height={200}
                color={[200, 200, 200, 0.6]} // RGBA
                scale={1.2}
                borderRadius={100}
                onDropFile={this.onFileAdded}
              />
            </div>
          </Form>
        </Row>

        <Modal.Footer>
          <Button onClick={this.handleSave} variant={'purple'}>
            {i18n.t('save')}
          </Button>
          <Button onClick={this.handleClose} variant={'purple'}>
            {i18n.t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LoadPhoto;
