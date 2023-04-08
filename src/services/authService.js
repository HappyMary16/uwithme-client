import * as config from "../config";
import {AuthService} from 'tcomad-oidc';

export const authService = new AuthService(
  config.AUTHORITY,
  config.CLIENT_ID,
  true
);

export function getId() {
  return authService.isLoggedIn() ? authService.getUserInfo('sub') : null;
}

export function hasRole(role) {
  return authService.isLoggedIn() && authService.getRoles().includes(role);
}

export function hasAnyRole(roles) {
  return authService.isLoggedIn() && authService.getRoles()
    .some(role => roles.includes(role));
}