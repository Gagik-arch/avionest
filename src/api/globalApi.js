import Api from './index';

class GlobalApi extends Api {
  getCountries(body) {
    return this.get({url: '/countries', body});
  }

}

const globalApi = new GlobalApi();

export default globalApi;
