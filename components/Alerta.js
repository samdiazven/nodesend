import React, {useContext} from 'react'
import authContext from '../context/auth/useContext'
import appContext from '../context/app/appContext'


const Alerta = () =>{
  const {mensaje} = useContext(authContext);
  const {mensaje_archivo} = useContext(appContext);
  return(
	<div className="bg-red-500 py-2 px-3 my-3 w-full max-w-lg text-center text-white mx-auto">
	    {mensaje || mensaje_archivo}

	</div>
  )
}

export default Alerta;
