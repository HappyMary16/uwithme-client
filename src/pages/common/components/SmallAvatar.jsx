import {Image} from 'react-bootstrap';
import React from 'react';
import {useAvatarDownloader} from "../../../hooks/useAvatarDownloader";
import emptyAvatar from "../../../assets/empty-avatar.png"

export function SmallAvatar({size = "30px", user, image}) {
  const [avatar] = useAvatarDownloader(user?.id);

  return (
    <Image roundedCircle
           alt="photo"
           src={avatar ?? image ?? emptyAvatar}
           width={size}
           height={size}/>
  );
}
