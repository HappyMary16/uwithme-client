import {AVATAR} from "../constants/serverApi";
import {http} from "../services/http";
import {arrayBufferToDataUrl} from "../utils/FileUtil";
import {useState} from "react";

export function useAvatarDownloader(userId) {

  const [avatar, setAvatar] = useState();

  function updateAvatar() {
    if (userId) {
      downloadAvatar(userId, setAvatar);
    }
  }

  if (!avatar) {
    updateAvatar();
  }

  return [avatar, updateAvatar]
}

function downloadAvatar(userId, setAvatar) {
  http({
    url: AVATAR + userId,
    method: "GET"
  })
    .then(response => {
      if (response.status === 200) {
        return response.arrayBuffer();
      }
    })
    .then(buffer => arrayBufferToDataUrl(buffer))
    .then(avatar => setAvatar(avatar))
}