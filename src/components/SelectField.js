import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';

export const SelectField = ({ label, initialValue, values, onChange }) => {
  let [value, setValue] = React.useState(initialValue);

  return (
    <Container>
      <TextField
        id="userType"
        select
        label={label}
        value={value}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        margin="normal"
        variant="outlined"
        fullWidth
      >
        {values.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Container>
  );
};
