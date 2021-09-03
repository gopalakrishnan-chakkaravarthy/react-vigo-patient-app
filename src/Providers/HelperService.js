import {DataManager, AppStateManager} from './index';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
class HelperService {
  logoutIfUserIsInvalid(navigation) {
    DataManager.clear();
    AppStateManager.Clear();
    navigation?.reset({
      index: 0,
      routes: [{name: AppGlobalConstants.Routes.LoginScreen}],
    });
  }
  get isLoggedIn() {
    return DataManager?.isLoggedIn();
  }
}
export default new HelperService();
