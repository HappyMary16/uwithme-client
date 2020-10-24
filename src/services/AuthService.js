import { UserManager } from 'oidc-client';
import * as Config from '../config.json';

const manager = new UserManager({
  authority: Config.AUTHORITY,
  client_id: Config.CLIENT_ID,
  redirect_uri: Config.REDIRECT_URI,
  post_logout_redirect_uri: Config.POST_LOGOUT_REDIRECT_URI,
  response_type: 'id_token token'
});

export class AuthService {
  currentUser = null;

  get isLoggedIn() {
    return this.currentUser != null && !this.currentUser.expired;
  }

  get getToken() {
    if (this.isLoggedIn) {
      return this.currentUser.access_token;
    } else {
      return null;
    }
  }

  get isLoggingIn() {
    return localStorage.getItem(Config.LOGIN_STATE) === Config.LOGGING_IN;
  }

  get isLoggingOut() {
    return localStorage.getItem(Config.LOGIN_STATE) === Config.LOGGING_OUT;
  }

  login() {
    localStorage.setItem(Config.LOGIN_STATE, Config.LOGGING_IN);
    manager.signinRedirect().catch(error => this.handleError(error));
  }

  async loadUser() {
    await manager
      .getUser()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  async completeLogin() {
    localStorage.removeItem(Config.LOGIN_STATE);
    await manager
      .signinRedirectCallback()
      .then(user => (this.currentUser = user))
      .catch(error => this.handleError(error));
  }

  logout() {
    localStorage.setItem(Config.LOGIN_STATE, Config.LOGGING_OUT);
    manager.signoutRedirect().catch(error => this.handleError(error));
  }

  async completeLogout() {
    localStorage.removeItem(Config.LOGIN_STATE);
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
