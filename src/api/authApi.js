import Api from './index';

class AuthApi extends Api {
  login(body) {
    return this.post({url: '/login', body});
  }

  signup(body) {
    return this.post({url: '/sign-up', body});
  }

  forgotPassword(body) {
    return this.post({url: '/forgot-password', body});
  }

  updateUser(body) {
    return this.put({url: '/users',body});
  }
}

const authApi = new AuthApi();

export default authApi;
