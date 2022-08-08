import {token} from './env';

var callServer = {
  request: async function (method, url, body, cbSuccess, cbFailure) {
    let config = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      credentials: 'include',
    };
    if (body !== '') {
      var body_new = JSON.stringify(body);

      config = {...config, body: body_new};
    }
    console.log(config);
    await fetch(url, config)
      .then(resp => {
        console.log('resp  in postcallerservver  ', resp);
        return resp.json();
      })
      .then(function (response) {
        if (cbSuccess) {
          cbSuccess(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (cbFailure) {
          cbFailure(error);
        }
      });
  },
};
module.exports = callServer;
