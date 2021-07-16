import axios from 'axios';
import {ApiConfig} from '../Config/ApiConfig';
import DataManager from './DataManager ';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
class BaseHttpService {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/');
        break;
      case 404:
        this.redirectTo(document, '/404');
        break;
      default:
        this.redirectTo(document, '/500');
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };
  get(path, callback) {
    path = this.getRequestUrl(path);
    this.setAccessToken();
    return this.service
      .get(path)
      .then(response => callback(response.status, response.data));
  }

  patch(path, payload, callback) {
    path = this.getRequestUrl(path);
    this.setAccessToken();
    return this.service
      .request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then(response => callback(response.status, response));
  }

  post(path, payload, callback) {
    path = this.getRequestUrl(path);
    this.setAccessToken();
    return this.service
      .request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then(response => callback(response.status, response));
  }
  getRequestUrl(path) {
    return ApiConfig.baseUrl + path;
  }
  setAccessToken() {
    const userToken = DataManager.GetItem(AppGlobalConstants.userToken);
    if (userToken) {
      const authorization = `Bearer ${userToken}`;
      this.service.defaults.headers.common.Authorization = authorization;
    }
  }
}

export default new BaseHttpService();
