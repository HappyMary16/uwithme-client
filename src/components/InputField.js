import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const InputField = ({
  label,
  autocomplete,
  autoFocus = false,
  type,
  error = false,
  helperText = '',
  onChange,
  onBlur
}) => {
  let id = label.replace(/\s+/g, '').toLowerCase();

  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        id={id}
        label={label}
        name={id}
        autoComplete={autocomplete}
        onChange={onChange}
        autoFocus={autoFocus}
        type={type}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
      />
    </Grid>
  );
};
