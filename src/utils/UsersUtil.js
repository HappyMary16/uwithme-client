export const hasRole = (user, role) => user?.roles?.includes(role);

export const getName = user => {
  if (!user) {
    return '';
  }

  const surname = user.surname ? user.surname : '';
  const firstName = typeof user.firstName === 'string' ? user.firstName : '';
  const middleName = typeof user.middleName === 'string' ? user.middleName : '';
  return surname + ' ' + firstName + ' ' + middleName;
};