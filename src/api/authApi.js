import Api from './index';

class AuthApi extends Api {
  signin(body) {
    return this.post({url: '/login', body});
  }

  signup(body) {
    return this.post({url: '/sign-up', body});
  }

  forgotPassword(body) {
    return this.post({url: '/forgot-password', body});
  }
}

const authApi = new AuthApi();

export default authApi;
