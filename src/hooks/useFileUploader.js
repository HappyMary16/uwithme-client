import {useState} from "react";
import {apiRoot, FILES} from "../constants/serverApi";
import {authService} from "../services/authService";

export function useFileUploader() {
  const [progress, setProgress] = useState({});
  const [completed, setCompleted] = useState(false);

  function monitor(fileName, event) {
    setProgress((prevProgress) => {
      const percentComplete = Math.ceil((event.loaded / event.total) * 100);
      const newProgress = {...prevProgress, [fileName]: percentComplete}

      if (Object.values(newProgress).every(value => value === 100)) {
        setCompleted(true);
      }

      return newProgress;
    })
  }

  function upload(files, subject, type) {
    setProgress((prevProgress) => {
      if (Object.values(prevProgress).some(value => value !== 100)) {
        throw new Error("Upload is in progress.");
      }
      setCompleted(false);
      return {};
    })

    for (const file of files) {
      startXhr(file, subject, type, (event) => monitor(file.name, event));
    }
  }

  return {completed, progress, upload}
}

function startXhr(file, subjectName, fileType, monitor) {
  authService.getToken()
    .then(token => {
      const formData = new FormData();
      formData.append("files", file);

      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        apiRoot + FILES + subjectName + "/" + fileType,
        true
      );

      xhr.setRequestHeader("Authorization", "Bearer " + token);

      xhr.upload.onprogress = event => monitor(event);

      xhr.send(formData);
    })
}