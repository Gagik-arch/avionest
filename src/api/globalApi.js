import Api from './index';

class GlobalApi extends Api {
  getCountries(body) {
    return this.get({url: '/countries', body});
  }
  getAircrafts(text) {
    return this.get({url: '/sources/aircraft-info-filtered/'+ text});
  }

}

const globalApi = new GlobalApi();

export default globalApi;
