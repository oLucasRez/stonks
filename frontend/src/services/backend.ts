import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://18.206.254.46:4000',
});

export default backend;
