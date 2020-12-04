import axios from 'axios';
//=============================================================[ SERVICE ]
const backend = axios.create({
  baseURL: 'http://54.166.221.23:4000',
});

export default backend;
