import React from 'react';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  }
}));

export const FieldWithChoice = ({ fieldName, listChoices, onChange }) => {
  const classes = useStyles();
  const [choices, setChoices] = React.useState(listChoices);
  const [open, setOpen] = React.useState(false);

  let filterChoices = value => {
    setChoices(listChoices.filter(choice => choice.startsWith(value)));
    onChange(value);
  };

  const valueHandleClick = name => {
    let component = document.getElementById('field');
    component.value = name;
    filterChoices(name);
    onChange(name);
  };

  return (
    <Container>
      <TextField
        id="field"
        label={fieldName}
        variant="outlined"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onFocus={e => {
          filterChoices(e.target.value);
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onChange={e => filterChoices(e.target.value)}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {choices.map((choice, i) => (
            <ListItem
              button
              key={i}
              onClick={() => valueHandleClick(choice)}
              className={classes.nested}
            >
              <ListItemText>{choice}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Container>
  );
};
