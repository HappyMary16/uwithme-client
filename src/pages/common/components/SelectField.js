import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export const SelectField = ({ label, initialValue, values, onChange }) => {
  let [value, setValue] = React.useState(initialValue);

  return (
    <TextField
      id="userRole"
      select
      label={label}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      margin="dense"
      size="small"
      variant="outlined"
      fullWidth
    >
      {values &&
      values.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
