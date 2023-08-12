import {useEffect, useState} from 'react';
import {FileTypes, LECTURE} from '../../constants/userRoles';
import {Upload} from './components/Upload';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import {selectorColors} from '../../styles/styles';
import {Message} from '../common/components/Message';
import {Button, Col} from 'react-bootstrap';
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchSubjectsByUserIdQuery} from "../../store/subject/subjectApiSlice";
import {useFileUploader} from "../../hooks/useFileUploader";
import {useTranslation} from "react-i18next";

export default function AddFile() {

  const {t} = useTranslation("file");
  const {completed, progress, upload} = useFileUploader();

  const {data: subjects} = useFetchSubjectsByUserIdQuery(getId() ?? skipToken);

  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState();
  const [fileType, setFileType] = useState(LECTURE);
  const [uploadSuccess, setUploadSuccess] = useState(completed);

  useEffect(() => {
    setUploadSuccess(completed)
  }, [completed])

  function submit() {
    upload(files, subject.label, fileType);
  }

  function createSubject(subjectName) {
    setSubject({
      value: subjectName,
      label: subjectName
    });
  }

  function uploadingEnded() {
    setUploadSuccess(false);
    setFiles([]);
  }

  return (
    <div>
      <Message
        open={uploadSuccess}
        handleClose={uploadingEnded}
        message={t("files_is_uploaded")}
      />
      <CreatableSelect
        className={"selector"}
        theme={selectorColors}
        placeholder={t("subject")}
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
        placeholder={t("file_type")}
      />
      <Upload
        uploadProgress={progress}
        addFiles={setFiles}
        files={files}
        successfulUploaded={completed}
      />
      <Col
        xs={12}
        md={{offset: 9, span: 3}}
        lg={{offset: 9, span: 3}}
        xl={{offset: 10, span: 2}}
      >
        <Button type={"submit"} variant={"purple"} onClick={submit}>
          {t("upload")}
        </Button>
      </Col>
    </div>
  );
}
