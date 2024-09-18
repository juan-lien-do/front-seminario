import axios from 'axios';
import URL_BACKEND from './src/constants/constants'

const instance = axios.create({
  baseURL: URL_BACKEND,
});

instance.interceptors.request.use(
  (config) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;