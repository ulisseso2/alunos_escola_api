// Para escolher as requisições na API

import axios from 'axios';

const axiosConfig = axios.create();
axiosConfig.defaults.baseURL = 'https://escola.odisseiaonline.com.br';

export default axiosConfig;
