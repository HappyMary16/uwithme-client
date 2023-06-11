import {FilesProgress} from './FilesProgress';
import '../../../styles/fileUpload.css';
import {Container, Row} from 'react-bootstrap';
import DropZone from "./DropZone";
import {useTranslation} from "react-i18next";

export function Upload({addFiles, uploadProgress, successfulUploaded, files}) {

  const {t} = useTranslation("file");

  let onFilesAdded = filesToAdd => {
    let array = [].concat(files);

    for (let i = 0; i < filesToAdd.length; i++) {
      if (!array.includes(filesToAdd.item(i))) {
        array.push(filesToAdd.item(i));
      }
    }
    addFiles(array);
  };

  return (
    <div className={'upload'}>
      <div className={'content'}>
        <div>
          <DropZone
            onFilesAddedFunk={onFilesAdded}
            disabled={Object.values(uploadProgress).length && !successfulUploaded}
          />
        </div>
        {(!files || files.length === 0) && (
          <Container>
            <Row className={'justify-content-center'}>
              <h5 className={'text'}>{t('choose_files')}</h5>
            </Row>
          </Container>
        )}
        {files && files.length > 0 && (
          <FilesProgress files={files} uploadProgress={uploadProgress} />
        )}
      </div>
    </div>
  );
}
