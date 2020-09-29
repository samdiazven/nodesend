import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout'
import authContext from '../context/auth/useContext';
import AppContext from '../context/app/appContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';
export default function Home() {
  const {usuarioAutenticado,  token} = useContext(authContext);
  const {mensaje_archivo, url} = useContext(AppContext);
    useEffect( ()=>{
	if(token){
	  usuarioAutenticado();
	}
    },[])
  return (
    <Layout>
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ?(
      <>
	  <p className="text-center text-3xl"><span className="text-3xl text-red-700 font-bold uppercase">Tu URL es:</span> {`${process.env.frontendURL}enlaces/${url}`} </p>

      <button type="button" 
		    className="mt-10 bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded"
		    onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}enlaces/${url}`)}
		    >Copiar Enlace </button>
      </>
      ):(
	<>
	 {mensaje_archivo && <Alerta /> }
      <div className="lg:flex md:shadow-lg p-10 bg-white rounded-lg py-10">
	  <Dropzone />
	<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
	  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
	      Compartir Archivos de forma Rapida y Privada
	  </h2>
	<p className="text-lg leading-loose"> 
	    <span className="text-red-500 font-bold">React NodeSend </span>  
	    Te permite compartir archivos de forma rapida y privada con cifrado de extremo a extremo, despues de la descarga el archivo puede ser eliminado. Asi que puedes mantener tu seguridad al maximo.
	</p>
	<Link href="crearcuenta">
	  <a className="text-red-500 hover:text-red-700 text-lg">Crea una Cuenta para mayor beneficio</a>
	</Link>
	</div>
      </div>
    

	</>


      )}
   </div>
    </Layout>
  )
  
}
