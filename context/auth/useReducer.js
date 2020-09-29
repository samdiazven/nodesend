
export default (state, action) =>{
      
    switch(action.type){
      case 'USUARIO_AUTENTICADO':
	return{
	  ...state,
	  user: action.payload,
	  autenticado: true
	}
      case 'REGISTAR_USUARIO':
	  return{
	      ...state,
	      user: action.payload

	  }
      case 'LOGIN_EXITOSO':
	localStorage.setItem('token', action.payload);
	return{
	  ...state,
	    token: action.payload,
	    autenticado: true
	}
      case 'REGISTRO_EXITOSO':
	return{
	  ...state,
	    mensaje: action.payload
	}
      case 'REGISTRO_FALLIDO':
      case 'LOGIN_FALLIDO':
	return{
	  ...state,
	  mensaje: action.payload
	}
      case 'LIMPIAR_ALERTA':
	return{
	  ...state,
	  mensaje: null
	}
      case 'CERRAR_SESION':
	localStorage.removeItem('token');
	return{
	    ...state,
	    user: null,
	    token: null,
	    autenticado: null
	}
      default: 
	return state;
    }

}
