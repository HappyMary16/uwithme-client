import {Image} from 'react-bootstrap';
import React, {useEffect} from 'react';
import {downloadAvatar} from "../../../services/avatarService";

export function SmallAvatar({size = "30px", user, image}) {
  const [avatar, setAvatar] = React.useState(image??"");

  useEffect(() => {
    if (user && !image) {
      downloadAvatar(user.id)
        .then(response => {
          setAvatar(response)
        })
    }
  }, [user, image])

  return (
    <Image roundedCircle
           alt="photo"
           src={avatar === "" ? '/empty-avatar.jpg' : avatar}
           width={size}
           height={size}/>
  );
}
