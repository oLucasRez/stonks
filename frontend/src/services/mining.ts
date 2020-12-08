import axios from 'axios';
//=============================================================[ SERVICE ]
const mining = axios.create({
  baseURL: 'http://localhost:5500',
});

export default mining;
