export const lightGreyColor = '#D3D3D3';

export const authStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#5c71c5'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#eeeeee'
  }
});

export const selectorColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#5c71c5',
    primary50: lightGreyColor,
    primary25: '#F5F5F5'
  }
});

export const marginTop = {
  marginTop: '20px'
};
