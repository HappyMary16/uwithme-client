export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export const CHANGE_IS_MENU_OPEN = 'CHANGE_IS_MENU_OPEN';

export const startFetching = () => ({
  type: START_FETCHING
});

export const endFetching = () => ({
  type: END_FETCHING
});

export const changeIsMenuOpen = () => ({
  type: CHANGE_IS_MENU_OPEN
});
