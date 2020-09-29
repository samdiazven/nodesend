import ClienteAxios from './axios';


const tokenAuth = token =>{
    if(token){
	ClienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
	    delete ClienteAxios.defaults.headers.common['Authorization'];
    }
      

}
export default tokenAuth;
