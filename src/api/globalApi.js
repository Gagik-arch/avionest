import Api from './index';

class GlobalApi extends Api {

  getCountries(body) {
    return this.get({url: '/countries', body});
  }
  getAircrafts(text) {
    return this.get({url: '/sources/aircraft-info-filtered/'+ text});
  }

  getAirfieldByRange(startDate,endDate){
    return this.get({url:`/airfields/free-by-range?startDate=${startDate}&endDate=${endDate}`})
  }
}

const globalApi = new GlobalApi();

export default globalApi;
