import axios from 'axios';
//=============================================================[ SERVICE ]
const main_server = axios.create({
  baseURL: 'http://localhost:4000',
});

export default main_server;
