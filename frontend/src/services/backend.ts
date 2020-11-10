import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://34.201.128.79:4000',
});

export default backend;
