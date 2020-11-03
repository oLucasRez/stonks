import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://54.174.66.235:4000',
});

export default backend;
