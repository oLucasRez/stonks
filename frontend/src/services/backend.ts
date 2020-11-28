import axios from 'axios';
//=============================================================[ SERVICE ]
const backend = axios.create({
  baseURL: 'http://localhost:4000',
});

export default backend;
