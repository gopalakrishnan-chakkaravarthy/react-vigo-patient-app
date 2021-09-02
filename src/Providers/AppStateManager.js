class AppStateManager {
  constructor() {
    this.globalState = {};
  }
  Set(key, value) {
    this.globalState[key] = value;
  }
  Get(key) {
    return this.globalState[key];
  }
  Clear() {
    this.globalState = {};
  }
}
export default new AppStateManager();
