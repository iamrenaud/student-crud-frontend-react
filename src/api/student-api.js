const Axios = require('axios').default;

module.exports.axios = Axios.create({
  baseURL: 'https://b0d48fc0.eu-gb.apigw.appdomain.cloud/api'
});