import React,{useReducer} from 'react'
import appContext from './appContext'
import reducer from './appReducer'
import ClienteAxios from '../../config/axios'


const AppState = ({children}) => {
  const initialState = {
	mensaje_archivo: '',
	nombre: '',
	nombre_original: '',
	cargando: null,
	descargas: 1,
	autor: null,
	password: '',
	url: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState);

    const mostrarAlerta = msg => {
	  dispatch({
	  type: 'MOSTRAR_ALERTA',
	  payload: msg
	  })
      setTimeout(()=>{
	dispatch({
	  type: 'OCULTAR_ALERTA'
	})
      },3000)
    }
  const subirArchivo = async (formData, nombrearchivo) =>{

	dispatch({
	    type: 'SUBIR_ARCHIVO'
	})          

    try{
    const resultado = await ClienteAxios.post('/api/archivos', formData)
      dispatch({
	  type: 'SUBIR_ARCHIVO_EXITO',
	  payload: {
	    nombre: resultado.data.archivo,
	    nombre_original: nombrearchivo
	  }
      })
    }catch(error){
	console.log(error);
	dispatch({
	  type: 'SUBIR_ARCHIVO_ERROR',
	  payload: error.response.data.msg
	})
          setTimeout(()=>{
	dispatch({
	  type: 'OCULTAR_ALERTA'
	})
      },3000)}

  }
    const crearEnlace = async () => {

      const datos = {
	autor: state.autor,
	password: state.password,
	descargas: state.descargas,
	nombre: state.nombre,
	nombre_original: state.nombre_original

      }
      try{
	const resultado = await ClienteAxios.post('/api/enlaces', datos);
	dispatch({
	type: 'CREAR_ENLACE_EXITO',
	payload: resultado.data.msg
	})
      }catch(error){
      console.log(error);
  
      }
    }
  const limpiarState = ()=>{
      dispatch({
	type: 'LIMPIAR_STATE'
      })
  }

  const agregarPassword = password =>{
    dispatch({
      type: 'AGREGAR_PASSWORD',
      payload: password
    })
  }
  const agregarDescargas = descarga =>{
      dispatch({
	type: 'AGREGAR_DESCARGA',
	payload: descarga

      })
  }
  return(
      <appContext.Provider value={{
	mensaje_archivo: state.mensaje_archivo,
	nombre: state.nombre,
	nombre_original: state.nombre_original,
	cargando: state.cargando,
	url: state.url,
	mostrarAlerta,
	subirArchivo,
	crearEnlace,
	limpiarState,
	agregarPassword,
	agregarDescargas
      }}>
	  {children}
      </appContext.Provider>
  )

}
export default AppState;
