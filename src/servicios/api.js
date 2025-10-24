import axios from 'axios';

// ¡IMPORTANTE! Asegúrate de que esta URL sea la correcta para tu backend (la que usa HTTPS).
const API_URL = 'http://localhost:5138/api';

const api = axios.create({
  baseURL: API_URL,
});

// Esto es un "interceptor": una función que se ejecuta ANTES de que cada petición sea enviada.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si tenemos un token, lo añadimos a la cabecera de autorización.
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

