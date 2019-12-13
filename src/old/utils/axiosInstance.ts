// import { ConcurrencyManager } from 'axios-concurrency';
// import axios from 'axios';

// let axiosInstance;
// let manager;
// function newInstance(baseURL: string) {
//   if (axiosInstance) {
//     detachInstance();
//   }
//   axiosInstance = axios.create({
//     baseURL,
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//   });
//   manager = ConcurrencyManager(axiosInstance, MAX_CONCURRENT_REQUESTS);

// }

// function detachInstance() {
//   if (axiosInstance) {
//     manager.detach();
//     axiosInstance = null;
//   }
// }
// const MAX_CONCURRENT_REQUESTS = 5;
// newInstance('https://www.api.alteva.eu:444');
// export default axiosInstance;
// export { axiosInstance };
// export { newInstance };
// export { detachInstance };
