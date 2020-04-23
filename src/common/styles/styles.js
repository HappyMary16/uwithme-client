export const purpleColor = '#483D8B';
export const lightGreyColor = '#D3D3D3';
export const buttonColor = '#eeeeee';

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
