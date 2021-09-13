import Image from 'react-bootstrap/Image';
import React from 'react';

export const SmallAvatar = ({ size = "30px", avatar }) => {
  return (
    <Image
      roundedCircle
      alt="photo"
      src={
        avatar === undefined || avatar === null ? '/empty-avatar.jpg' : avatar
      }
      width={size}
      height={size}
    />
  );
};
