import http from "./http";
import {AVATAR} from "../constants/serverApi";
import {arrayBufferToDataUrl} from "../utils/FileUtil";

export function downloadAvatar(userId) {
  return new Promise((resolve) => {
    http({
      url: AVATAR + userId,
      method: "get",
      loadFile: true
    }).then(response => {
      if (response.status === 200) {
        resolve(arrayBufferToDataUrl(response.data));
      }
    })
  });
}

export function uploadAvatar(avatar, onError) {
  const formData = new FormData();

  formData.append("file", avatar, "avatar.png");

  http({
    url: AVATAR,
    method: "post",
    data: formData,
    isFile: true
  }).catch(error => onError(error));
}