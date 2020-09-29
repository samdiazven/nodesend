import React, {useReducer} from 'react'
import authContext from './useContext'
import reducer from './useReducer'
import authToken from '../../config/token';

import ClienteAxios from '../../config/axios'

const AuthState = ({children}) => {
  const initialState={
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    mensaje: null

  }
    const [state, dispatch] =  useReducer(reducer, initialState);

  const registrarUsuario = async datos =>{
	try{
	    const respuesta = await ClienteAxios.post('/api/usuarios', datos); 
		  
	  dispatch({
	    type: 'REGISTRO_EXITOSO',
	    payload: respuesta.data.msg

	  });



       setTimeout( () => {
	  dispatch({
	    type: 'LIMPIAR_ALERTA'
	  })
      },3000);

	}
         catch(error){
      dispatch({
	type: 'REGISTRO_FALLIDO',
	payload: error.response.data.msg

      })
	setTimeout( () => {
	  dispatch({
	    type: 'LIMPIAR_ALERTA'
	  })
      },3000);
    }
   }
      
  const usuarioAutenticado = async () =>{
    const token = localStorage.getItem('token');
    if(token){
	authToken(token);

    }
      try{
	const resultado = await ClienteAxios.get('/api/auth');
	  if(resultado.data.usuario){
	dispatch({
	  type: 'USUARIO_AUTENTICADO',
	  payload: resultado.data.usuario
	})
	  }
	
	 }catch(error){
	  dispatch({
	type: 'REGISTRO_FALLIDO',
	payload: error.response.data.msg

      })
	setTimeout( () => {
	  dispatch({
	    type: 'LIMPIAR_ALERTA'
	  })
      },3000);
    }

      }
     
  const iniciarSesion = async datos =>{

    try{
	const resultado = await ClienteAxios.post('/api/auth', datos);
	dispatch({
	type: 'LOGIN_EXITOSO',
	payload: resultado.data.token
	})
    }catch(error){
	dispatch({
	  type: 'LOGIN_FALLIDO',
	  payload: error.response.data.msg

	})
	setTimeout( () => {
	  dispatch({
	    type: 'LIMPIAR_ALERTA'
	  })
      },3000);
    }
  }
  const cerrarSesion = () => {
      
    dispatch({
	type: 'CERRAR_SESION',
    })

  }
    
  return(
      <authContext.Provider
	value={{
	  token: state.token,
	  autenticado: state.autenticado,
	  mensaje: state.mensaje,
	  user: state.user,
	  usuarioAutenticado,
	  registrarUsuario,
	  iniciarSesion,
	  cerrarSesion
	}}
    >
      {children}
    </authContext.Provider>
  )
}
export default AuthState;



