import Api from './index';

class GlobalApi extends Api {

    getAircrafts(text) {
        return this.get({url: '/sources/aircraft-info-filtered/' + text});
    }

    getAirfieldByRange(
        startDate,
        endDate,
        spaceType = 'parking',
        oaciId,
        refreshToken = false,
    ) {
        let url = `/airfields/free-by-range?&spaceType=${spaceType}`
        if (startDate) {
            url += `&startDate=${startDate}`
        }
        if (endDate) {
            url += `&endDate=${endDate}`
        }
        if (oaciId) {
            url += `&oaciId=${oaciId}`
        }
        return this.get({url, refreshToken})
    }

    getAuthSources() {
        return this.get({url: '/auth-sources'})
    }

    getAirfieldById(id,spaceType) {
        return this.get({url: `/airfields/${id}/${spaceType}`})
    }

    checkEmailExist(body){
        return this.post({url:'/check-email-exists',body})
    }
}

const globalApi = new GlobalApi();

export default globalApi;
