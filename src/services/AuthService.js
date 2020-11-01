import { UserManager } from 'oidc-client';
import * as Config from '../config.json';

export const LOGGING_IN = 'logging_in';
export const LOGIN_STATE = 'login_state';
export const LOGGING_OUT = 'logging_out';
const manager = new UserManager({
  authority: Config.AUTHORITY,
  metadata: {
    issuer: Config.AUTHORITY,
    authorization_endpoint: Config.AUTHORITY + '/protocol/openid-connect/auth',
    token_endpoint: Config.AUTHORITY + '/protocol/openid-connect/token',
    userinfo_endpoint: Config.AUTHORITY + '/protocol/openid-connect/userinfo',
    end_session_endpoint: Config.AUTHORITY + '/protocol/openid-connect/logout'
  },
  client_id: Config.CLIENT_ID,
  redirect_uri: Config.REDIRECT_URI,
  post_logout_redirect_uri: Config.REDIRECT_URI,
  response_type: 'code'
});

export class AuthService {
  currentUser = null;

  get isLoggedIn() {
    return this.currentUser != null;
  }

  get isLoggingIn() {
    return localStorage.getItem(LOGIN_STATE) === LOGGING_IN;
  }

  get isLoggingOut() {
    return localStorage.getItem(LOGIN_STATE) === LOGGING_OUT;
  }

  hasRole(role) {
    return this.currentUser.profile.realm_access.roles.includes(role);
  }

  async getToken() {
    if (this.isLoggedIn) {
      if (this.currentUser.expired) {
        await manager
          .signinSilent()
          .then(user => (this.currentUser = user))
          .catch(() => this.login());
      }
      return this.currentUser.access_token;
    } else {
      return null;
    }
  }

  login() {
    localStorage.setItem(LOGIN_STATE, LOGGING_IN);
    manager.signinRedirect().catch(error => this.handleError(error));
  }

  async loadUser() {
    await manager
      .getUser()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  async completeLogin() {
    localStorage.removeItem(LOGIN_STATE);
    await manager
      .signinRedirectCallback()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  logout() {
    localStorage.setItem(LOGIN_STATE, LOGGING_OUT);
    manager.signoutRedirect().catch(error => this.handleError(error));
  }

  async completeLogout() {
    localStorage.removeItem(LOGIN_STATE);
    await manager
      .signoutRedirectCallback()
      .then(() => {
        manager.removeUser().then(() => {
          this.currentUser = null;
        });
      })
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    console.error('Auth error: ', error);
  }
}
