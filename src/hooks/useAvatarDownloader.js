import {AVATAR} from "../constants/serverApi";
import {http} from "../services/http";
import {arrayBufferToDataUrl} from "../utils/FileUtil";
import {useEffect, useState} from "react";

export function useAvatarDownloader(userId) {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
      downloadAvatar(userId, setAvatar);
  }, [userId])

  return [avatar, () => downloadAvatar(userId, setAvatar)]
}

function downloadAvatar(userId, setAvatar) {
  if (!userId) {
    return;
  }

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