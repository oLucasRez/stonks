import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://50k.dev:4000',
});

export default backend;
