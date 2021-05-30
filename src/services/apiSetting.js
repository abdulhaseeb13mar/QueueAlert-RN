import Axios from 'axios';

//Constants
const BASE_URL = '';

//Axios Configuration
const api = Axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

api.interceptors.request.use(
  async config => {
    //   get token from redux or ASYNC STORAGE and set headers

    // const token = await AsyncStorage.getItem(ACCESS_TOKEN);

    // if (token != null) {
    //   config.headers.Authorization = token;
    // }

    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

apiClient.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    var errorMessage = '';

    console.log('API ERROR:', error);
    console.log(`Error on this api = ${error.config.url}`);
    console.log('API STATUS CODE:', error.response.status);
    console.log('origional request retry', originalRequest._retry);

    // ___________________ HANDLING 401 / TOKEN GALAT ____________________

    //refresh token ki api pe hi agar aunauthroized ajae
    // if (
    //   error.response.status === 401 &&
    //   error.config.url === APIConst.RefreshToken
    // ) {
    //   clearUserData();
    //   return console.log(
    //     'status is ',
    //     error.response.status,
    //     'and also url => refresh token wala, means 401 retried but failed again, refresh token is invalid ',
    //   );
    // }

    // //handling unauthorized response
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   console.log('TOKEN EXPIRED , HANDLING 401 ERROR');

    //   originalRequest._retry = true;
    //   //get access token from async storage

    //   console.log('refresh token fetching from async');

    //   const refresh_token = await AsyncStorage.getItem(AppConst.REFRESH_TOKEN);
    //   console.log(refresh_token);

    //   return apiClient
    //     .post(APIConst.RefreshToken, {
    //       refreshToken: refresh_token,
    //       action: 'refresh',
    //     })
    //     .then(async (res) => {
    //       console.log('response of refresh token api', res.status, res.data);
    //       if (res.status === 200) {
    //         // 1) put token to LocalStorage
    //         setAccessToken(res.data);

    //         // 2) Change Authorization header
    //         const token = await AsyncStorage.getItem(AppConst.ACCESS_TOKEN);

    //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    //         // 3) return originalRequest object with Axios.
    //         return apiClient(originalRequest);
    //       }
    //     })
    //     .catch((e) => console.log('error in ref token', e));
    // }

    return Promise.reject({
      errorMessage: error.response?.data,
      status: error.response.status,
    });
  },
);

export default api;
