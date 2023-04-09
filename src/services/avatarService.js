import {http} from "./http";
import {AVATAR} from "../constants/serverApi";
import {arrayBufferToDataUrl} from "../utils/FileUtil";

export function downloadAvatar(userId) {
  return http({
    url: AVATAR + userId,
    method: "GET"
  }).then(response => {
    if (response.status === 200) {
      return response.arrayBuffer();
    }
  }).then(buffer => arrayBufferToDataUrl(buffer))
}

export function uploadAvatar(avatar, onError) {
  const formData = new FormData();

  formData.append("file", avatar, "avatar.png");

  return http({
    url: AVATAR,
    method: "post",
    body: formData
  }).catch(error => onError(error));
}