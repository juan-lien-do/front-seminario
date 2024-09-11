import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
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