import {Image} from 'react-bootstrap';
import React from 'react';

export function SmallAvatar({size = "30px", avatar}) {
  return (
    <Image roundedCircle
           alt="photo"
           src={avatar === undefined || avatar === null ? '/empty-avatar.jpg' : avatar}
           width={size}
           height={size}/>
  );
}
