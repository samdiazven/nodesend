import axios from 'axios'


  const ClienteAxios = axios.create({
      baseURL: process.env.backendURL

  });
export default ClienteAxios;
