import { useParams } from 'react-router-dom';
import React from 'react';

export const withUserId = (Component) => {
  return (props) => {
    const {userId} = useParams();

    return (
      <Component userId={userId} {...props} />
    );
  };
};
