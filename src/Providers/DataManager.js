class DataManager {
  constructor() {
    this.globalState = {userToken: '', isLoggedIn: false, loginName: ''};
  }
  SetItem(key, value) {
    this.globalState[key] = value;
  }
  setLoginStatus() {
    this.globalState.isLoggedIn = true;
  }
  isLoggedIn() {
    return this.globalState?.isLoggedIn;
  }
  GetItem(key) {
    return this.globalState[key];
  }
  clear() {
    this.globalState = {userToken: '', isLoggedIn: false, loginName: ''};
  }
}
export default new DataManager();
