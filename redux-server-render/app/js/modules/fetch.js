import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

const Config = {
  ai: 1
};
// ajax constructor
Fetch.prototype.API = {
  group: { method: 'GET', base: '/api/v1/group/page', param: { group_id: 1, config_id: 1 } },
  page: { method: 'GET', base: `/api/v1/page/content/${Config.ai}`, param: { page_id: 1, blocks: 3, pages: 1 } },
  nav: { method: 'GET', base: '/api/v1/page/block', param: { page_id: 1, blocks: 6, pages: 1 } },
  introduce: { method: 'GET', base: '/api/v1/book/introduce', param: { bid: 1 } }
};

Fetch.prototype.setUrl = function(url){
  const base_url = 'https://readapi.imread.com';
  return base_url+url;
};

Fetch.prototype.transformData = function(pramas){
  if(!pramas instanceof Object) return;
  let str = '';
  for (let key in pramas) {
    str += '&' + key + '=' + pramas[key];
  }
  return str.replace('&','');
};

Fetch.prototype.ajax = function(){
  const isNode = typeof window === 'undefined';
  const method = this.api.method;
  const appid = isNode ? ( global.cookie.jndl_appid || 1 ) : (1);
  const channel = 'ImreadH5';
  const url = method.toLowerCase() === 'get' ? (this.setUrl(this.api.base) + '?' + this.transformData(this.api.param)) : this.setUrl(this.api.base);
  const headers = new Headers({
    'Info-Imsi': '',
    'Info-Imei': '',
    'Info-Channel': channel,
    'Info-appid': appid,
    'Info-Version': '2.4.1',
    'Info-Model': '',
    'Info-Os': '',
    'Info-Platform': 'ImreadH5',
    'Info-Vcode': '101',
    //'Info-Uuid': isNode ? (getCookie('InfoUuid', global.cookie) || '') : GLOBAL.getUuid(),
  });

  const fetch_options = {
      method,
      headers,
      mode: 'cors',
      credentials: 'include',
  };
  if (method.toLowerCase() === 'post') fetch_options.body = this.transformData(this.api.param);
  return fetch(url, fetch_options).then((response) => {
      return response.json();
  });
};


function Fetch(param){
  if (!param) return;
  const options = param.split('.');
  const api = this.API[options.shift()];
  let i = 0;
  for (let key in api.param) {
    if(options[i] && options[i] !== '-')
      api.param[key] = options[i];
    i ++;
  };
  this.api = api;
  return this.ajax();
};

module.exports = Fetch;
