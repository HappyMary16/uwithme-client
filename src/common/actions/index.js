export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export const startFetching = () => ({
  type: START_FETCHING
});

export const endFetching = () => ({
  type: END_FETCHING
});

export const handleAuthenticationCallback = () => ({
  type: HANDLE_AUTHENTICATION_CALLBACK
});
