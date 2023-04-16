import {FILES} from "../constants/serverApi";
import {http} from "../services/http";

export function useFileDownloader() {
  return downloadFile;
}

function downloadFile(fileId, fileName, loading) {
  http({
    url: FILES + fileId,
    method: "get"
  }).then(async (response) => {
    if (response.status === 200) {
      return {
        type: response.headers.get("Content-Type"),
        buffer: await response.arrayBuffer()
      };
    }
  }).then(({type, buffer}) => {
    let blob = new Blob([buffer], {type});
    let url = URL.createObjectURL(blob);

    if (loading) {
      saveFile(url, fileName);
    } else {
      openFile(url);
    }
  });
}

function saveFile(url, fileName) {
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
}

function openFile(url) {
  let newWindow = window.open("/files/loading");
  newWindow.onload = () => {
    newWindow.location = url;
  };
}