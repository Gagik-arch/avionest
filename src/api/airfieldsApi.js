import Api from './index';

class AirfieldsApi extends Api {
    constructor() {
        super('/airfields');

    }

    calcBookPrice(body) {
        return this.post({url: '/calc-book-price' ,body});
    }
    bookAirfield(body) {
        return this.post({url: '/book', body})
    }
}

const airfieldsApi = new AirfieldsApi();

export default airfieldsApi;
