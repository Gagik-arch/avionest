import Api from './index';

class GlobalApi extends Api {

  getAircrafts(text) {
    return this.get({url: '/sources/aircraft-info-filtered/'+ text});
  }

  getAirfieldByRange(startDate,endDate,spaceType='parking',oaciId){
    return this.get({url:`/airfields/free-by-range?startDate=${startDate}&endDate=${endDate}&spaceType=${spaceType}&oaciId=${oaciId}`})
  }
  getAuthSources(){
    return this.get({url:'/auth-sources'})
  }
}

const globalApi = new GlobalApi();

export default globalApi;
