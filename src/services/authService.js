let userInfo = null;

export const authService = {
  async init() {
    const response = await fetch("/oauth2/userinfo");
    if (!response.ok) {
      this.login();
      return;
    }
    userInfo = await response.json();
  },

  isLoggedIn() {
    return userInfo !== null;
  },

  login() {
    const rd = window.location.pathname + window.location.search;
    window.location.assign("/oauth2/start?rd=" + encodeURIComponent(rd));
  },

  refresh() {
    this.login();
  },

  logout() {
    window.location.assign("/oauth2/sign_out?rd=/");
  }
};

export function getId() {
  return authService.isLoggedIn() ? userInfo.user : null;
}

export function hasAnyRole(roles) {
  return authService.isLoggedIn() && (userInfo.groups ?? [])
    .some(group => roles.includes(group.replace(/^role:/, "")));
}
