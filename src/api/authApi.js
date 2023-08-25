import Api from './index';

class AuthApi extends Api {
  signin(body) {
    return this.post({url: '/login', body});
  }
  signup(body) {
    return this.post({url: '/createUser', body});
  }
  logout() {
    return this.post({url: '/logout'});
  }
}

const authApi = new AuthApi();

export default authApi;
