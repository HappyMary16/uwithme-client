import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FileTypes, LECTURE} from '../../../constants/userRoles';
import {Upload} from './components/Upload';
import i18n from '../../../locales/i18n';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {Message} from '../../common/components/Message';
import {Button, Col} from 'react-bootstrap';
import {
  clearUploadProgress,
  clearUploadSuccess,
  loadSubjectsAndFiles,
  uploadRequest
} from '../../../actions/fileActions';
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";

export default function AddFile() {

  const dispatch = useDispatch();

  const {data: {user}} = useFetchUserQuery();
  const userId = user.id;
  const username = user.username;

  const subjects = useSelector(state => state.filesReducers.subjects);
  const uploadProgress = useSelector(state => state.filesReducers.uploadProgress);
  const uploadSuccess = useSelector(state => state.filesReducers.uploadSuccess);

  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState();
  const [fileType, setFileType] = useState(LECTURE);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(loadSubjectsAndFiles(userId));
  }, [userId, dispatch])

  function submit() {
    setUploading(true);
    dispatch(uploadRequest(files, username, subject.label, fileType));
  }

  function createSubject(subjectName) {
    setSubject({
      value: subjectName,
      label: subjectName
    });
  }

  function uploadingEnded() {
    setUploading(false);
    setFiles([]);

    dispatch(clearUploadSuccess());
    dispatch(clearUploadProgress());
  }

  return (
    <div>
      <Message
        open={uploadSuccess}
        handleClose={uploadingEnded}
        message={i18n.t("files_is_uploaded")}
      />
      <CreatableSelect
        className={"selector"}
        theme={selectorColors}
        placeholder={i18n.t("subject")}
        options={
          subjects &&
          subjects.map(subject => {
            return {
              label: subject.name,
              value: subject.id
            };
          })
        }
        onChange={setSubject}
        onCreateOption={createSubject}
        value={subject}
      />
      <Select
        className={"selector"}
        theme={selectorColors}
        onChange={opinion => setFileType(opinion.value)}
        options={FileTypes}
        placeholder={i18n.t("file_type")}
      />
      <Upload
        uploadProgress={uploadProgress}
        addFiles={setFiles}
        files={files}
        uploading={uploading}
        successfulUploaded={uploadSuccess}
      />
      <Col
        xs={12}
        md={{offset: 9, span: 3}}
        lg={{offset: 9, span: 3}}
        xl={{offset: 10, span: 2}}
      >
        <Button
          block
          type={"submit"}
          variant={"purple"}
          onClick={submit}
        >
          {i18n.t("upload")}
        </Button>
      </Col>
    </div>
  );
}
