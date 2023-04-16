import {Image} from 'react-bootstrap';
import React from 'react';
import {useAvatarDownloader} from "../../../hooks/useAvatarDownloader";

export function SmallAvatar({size = "30px", user, image}) {
  const [avatar] = useAvatarDownloader(user?.id);

  return (
    <Image roundedCircle
           alt="photo"
           src={avatar === "" ? image??'/empty-avatar.jpg' : avatar}
           width={size}
           height={size}/>
  );
}
