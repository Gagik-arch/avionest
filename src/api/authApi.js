import Api from './index';

class AuthApi extends Api {
  signin(body) {
    return this.post({url: '/sign-in', body});
  }
  signup(body) {
    return this.post({url: '/sign-up', body});
  }

}

const authApi = new AuthApi();

export default authApi;
