import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorMessage} from '../components/ErrorMessage';
import {removeError} from '../../../actions/messageAction';

export default function ErrorContainer() {

  const dispatch = useDispatch();

  const errors = useSelector(state => state.messageReducers.errors);

  function closeMessage(errorId) {
    dispatch(removeError(errorId));
  }

  return (
    <div>
      {Array.isArray(errors) && errors.map((error) => (
        <ErrorMessage
          error={error}
          handleClose={closeMessage}
        />
      ))}
    </div>
  );
}
