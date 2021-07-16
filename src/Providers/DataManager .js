class DataManager {
  constructor() {
    this.globalState = {userToken: '', isLoggedIn: false, loginName: ''};
  }
  SetItem(key, value) {
    this.globalState[key] = value;
  }

  GetItem(key) {
    return this.globalState[key];
  }
}
export default new DataManager();
