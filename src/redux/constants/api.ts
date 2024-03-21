import Cookies from 'js-cookie'
import global from './global'

// const axios = require('axios');
// const tokens_res = Cookies.get('tokens') || ''


// var token = ''
// if (tokens_res !== '') {
// 	const tokens = JSON.parse(tokens_res)
// 	token = tokens.access
// }
// const apiBaseUrl = global.apiBaseUrl

// // console.log(token)

// var headers = {
// 	'x-api-key': `${process.env.REACT_APP_API_KEY}`,
// }

// const axios_instance = axios.create({
// 	baseURL: apiBaseUrl,
// 	timeout: 10000000,
// 	headers: token ? { 'Authorization': 'Bearer ' + token, 'x-api-key': `${process.env.REACT_APP_API_KEY}` } : headers
// });

// // axios_instance.interceptors.response.use(response => {
// //   return response;
// // }, error => {
// //   if (error.response !== undefined) {
// //     if (error.response.status === 401) {
// //       //place rentry location.....login
// //       Cookies.remove('authenticated');
// //       Cookies.remove('tokens');
// //     //   localStorage.removeItem('merchant');
// //     //   Cookies.remove('userDetails');

// //       window.location.assign(global.appBaseUrl + "login");
// //     }
// //   }
// //   return Promise.reject(error);
// // });

// export default axios_instance

export const authorizationRedirect = () => {
	//place rentry location.....login
	let host = Cookies.get("host") || ""
	Cookies.remove('authenticated');
	Cookies.remove("org")
	Cookies.remove('babtbu');
	Cookies.remove('brbtbu');
	Cookies.remove('tenant');
	Cookies.remove("hostName")
	Cookies.remove('documentation');
	Cookies.remove('sdkUrl');
	// window.location.assign(`${global.appSSOUrl}?loggedOut=true&&fromProd=${window?.location?.href}`);
	
}

export let serverCodes = [
	500,501,502,503,504,505,506,507,508,509,510,511,
]

