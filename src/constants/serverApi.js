import config from '../config';

export const apiRoot = `http://${config.host}:${config.port}`;

export const SIGN_IN = '/login';

export const GET_INSTITUTES = '/';
export const GET_DEPARTMENTS = '/';
export const GET_GROUPS = '/';
