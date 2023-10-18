import Api from './index';

class UsersApi extends Api {
  constructor() {
    super('/users');
  }

  getCards() {
    return this.get({url: '/get-cards'});
  }
  deleteCard(body) {
    return this.post({url: '/delete-card',body});
  }


}

const usersApi = new UsersApi();

export default usersApi;
