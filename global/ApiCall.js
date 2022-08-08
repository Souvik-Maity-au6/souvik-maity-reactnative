import Constants from './Constants';
import Server from './ApiServices';

function serverData() {
  this.url = Constants.APIS.BASE_URL;
  this.customUrl;

  this.GetAllProductLIst = async function (userData, callback, error) {
    console.log(userData);
    this.customUrl = `${this.url}products`;
    await Server.request('GET', this.customUrl, '', callback, error);
  };

  this.GetAllCategoryList = async function (userData, callback, error) {
    console.log(userData);
    this.customUrl = `${this.url}categories`;
    await Server.request('GET', this.customUrl, '', callback, error);
  };

  this.AddProduct = async function (userData, callback, error) {
    console.log(userData);
    this.customUrl = `${this.url}products`;
    await Server.request('POST', this.customUrl, userData, callback, error);
  };
}

module.exports = new serverData();
