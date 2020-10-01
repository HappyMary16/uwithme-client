export const purpleColor = '#483D8B';
export const lightGreyColor = '#D3D3D3';
export const buttonColor = '#eeeeee';
export const textColor = '#696969';

export const authStyles = theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#483D8B'
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
    primary: purpleColor,
    primary50: lightGreyColor,
    primary25: '#F5F5F5'
  }
});

export const marginTop = {
  marginTop: '20px'
};

export const marginLeft = {
  marginLeft: '10px',
  backgroundColor: buttonColor
};

export const switchWeek = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontSize: 15
};
