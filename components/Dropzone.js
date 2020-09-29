import React, {useContext, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import appContext from '../context/app/appContext';
import AuthContext from '../context/auth/useContext';
import Formulario from '../components/formulario'

const DropZone = () =>{

    const {mostarAlerta, subirArchivo, cargando, crearEnlace } = useContext(appContext);
    const {autenticado } = useContext(AuthContext);
	const onDropRejected = () =>{
	  mostarAlerta('No se pudo Subir, el limite es un 1MB obten una cuenta para mas capacidad!!');
	}


      const onDropAccepted = useCallback(async (acceptedFiles) =>{

	const formData = new FormData();

	formData.append('archivo', acceptedFiles[0]);

	  subirArchivo(formData, acceptedFiles[0].path);
      },[]);

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});
    
    const archivos = acceptedFiles.map( a => (
	<li key={a.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="text-bold text-xl"> {a.path} </p> 
      <p className="text-sm text-gray-500"> {a.size} bytes </p> 
      </li>
    ));
    
    return(
	<div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? 

	  (
	<div className="mt-10 w-full">
	<h2 className="text-2xl font-bold text-center mb-4"> Archivo </h2>
	<ul>
	  {archivos}
	</ul>
	    {
	      autenticado ? 
		<Formulario />
	      : ""
	    }
	    {cargando ? <p className="my-10 text-center text-gray-600">Subiendo Archivo.... </p>
	      :
	<button onClick={() => crearEnlace()} type="button" className=" bg-blue-600 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" > Crear Enlace</button>

	    }
       </div>
)

	:

      (

  <div {...getRootProps({className: 'dropzone w-full py-32'})}>
	<input className="h-100" {...getInputProps()} />
	{
	    isDragActive ? <p className="text-2xl text-center text-gray-300">Suelta el Archivo </p>:
      <div className="text-center">
    <p className="text-2xl text-center text-gray-600">
	  Selecciona un Archivo y Arrastralo Aqui
	</p>
	<button className="bg-blue-600 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button"> Selecciona Archivo para Subir </button>
	  </div>
	}
      </div>


      )


      }
      	</div>
    )

}

export default DropZone;


