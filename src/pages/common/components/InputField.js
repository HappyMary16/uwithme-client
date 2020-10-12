import React from 'react';

import TextField from '@material-ui/core/TextField';

export const InputField = ({
                             label,
                             autoComplete,
                             autoFocus = false,
                             type,
                             error = false,
                             helperText = '',
                             onChange,
                             onBlur,
                             required = true
                           }) => {
  let id = label.replace(/\s+/g, '').toLowerCase();

  return (
    <TextField
      variant='outlined'
      margin='dense'
      size='small'
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      onChange={onChange}
      autoFocus={autoFocus}
      type={type}
      error={error}
      helperText={helperText}
      onBlur={onBlur}
    />
  );
};
