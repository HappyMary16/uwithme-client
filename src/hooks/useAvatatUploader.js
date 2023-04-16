import {AVATAR} from "../constants/serverApi";
import {http} from "../services/http";

export function useAvatarUploader() {
  return uploadAvatar
}

function uploadAvatar(avatar, onError) {
  const formData = new FormData();

  formData.append("file", avatar, "avatar.png");

  return http({
    url: AVATAR,
    method: "post",
    body: formData
  }).catch(error => onError(error));
}