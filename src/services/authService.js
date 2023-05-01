import * as config from "../config";
import {AuthService} from 'tcomad-oidc';

export const authService = new AuthService({
  authority: config.AUTHORITY,
  clientId: config.CLIENT_ID,
  autoLogin: true
});

export function getId() {
  return authService.isLoggedIn() ? authService.getUserInfo('sub') : null;
}

export function hasAnyRole(roles) {
  return authService.isLoggedIn() && (authService.getUserInfo('roles') ?? [])
    .some(role => roles.includes(role));
}