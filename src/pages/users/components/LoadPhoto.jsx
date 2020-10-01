import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import i18n from '../../../locales/i18n';
import '../../../common/styles/fileUpload.css';
import AvatarEditor from 'react-avatar-editor-scale';

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

  setEditorRef = (editor) => this.editor = editor;

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
      <Dialog open={open}
              onClose={this.handleClose}
              maxWidth='sm'
              aria-labelledby='form-dialog-title'>

        <div className={'paddingLeft'}>
          <input
            className={'paddingOne'}
            type='file'
            multiple
            onChange={this.onFileAdded}
          />
          <div className={'paddingOne'}>
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
        </div>

        <DialogActions>
          <Button onClick={this.handleSave} color='primary'>
            {i18n.t('save')}
          </Button>
          <Button onClick={this.handleClose} color='primary'>
            {i18n.t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LoadPhoto;
