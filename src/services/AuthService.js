import { UserManager } from 'oidc-client';
import * as config from '../config';

const manager = new UserManager({
  authority: config.AUTHORITY,
  metadata: {
    issuer: config.AUTHORITY,
    authorization_endpoint: config.AUTHORITY + '/protocol/openid-connect/auth',
    token_endpoint: config.AUTHORITY + '/protocol/openid-connect/token',
    userinfo_endpoint: config.AUTHORITY + '/protocol/openid-connect/userinfo',
    end_session_endpoint: config.AUTHORITY + '/protocol/openid-connect/logout'
  },
  client_id: config.CLIENT_ID,
  redirect_uri: config.REDIRECT_URI,
  post_logout_redirect_uri: config.REDIRECT_URI,
  response_type: 'code'
});

export class AuthService {
  currentUser = null;

  get isLoggedIn() {
    return this.currentUser != null;
  }

  get isLoggingIn() {
    return localStorage.getItem(config.LOGIN_STATE) === config.LOGGING_IN;
  }

  get isLoggingOut() {
    return localStorage.getItem(config.LOGIN_STATE) === config.LOGGING_OUT;
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
    localStorage.setItem(config.LOGIN_STATE, config.LOGGING_IN);
    manager.signinRedirect().catch(error => this.handleError(error));
  }

  async loadUser() {
    await manager
      .getUser()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  async completeLogin() {
    localStorage.removeItem(config.LOGIN_STATE);
    await manager
      .signinRedirectCallback()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  logout() {
    localStorage.setItem(config.LOGIN_STATE, config.LOGGING_OUT);
    manager.signoutRedirect().catch(error => this.handleError(error));
  }

  async completeLogout() {
    localStorage.removeItem(config.LOGIN_STATE);
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
