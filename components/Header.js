import React,{useContext, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router'
import authContext from '../context/auth/useContext'
import appContext from '../context/app/appContext'


const Header = ()=>{
    const { user, cerrarSesion} = useContext(authContext);
    const { limpiarState} = useContext(appContext);
    const router = useRouter();
  const redirect = ()=>{
      limpiarState(); 
      router.push('/');    
  }
  return(
    <header className="py-8 flex flex-col md:flex-row item-center justify-between">
      <img className="w-64 cursor-pointer mb-8 md:mb-0" src="/logo.svg"
	    onClick={()=>redirect()}
    />
	<div>
	  {
	    user ? 
	    <div className="flex items-center">
	    <p className="mr-2">Hola {user.nombre} </p> 
	    <button type="button"
		    className="bg-black px-5 py-3 ml-2 rounded-lg text-white font-bold uppercase"
		    onClick={() => cerrarSesion()}
	    >
	      Cerrar Sesion
	    </button>
	    </div>
	    :  
	      <>
	    <Link href="/login">
	      <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase"> Iniciar Sesion </a>
	  </Link>
	  <Link href="/crearcuenta">
	      <a className="bg-black px-5 py-3 ml-2 rounded-lg text-white font-bold uppercase"> Crear Cuenta </a>
	  </Link>
	      </>
	  }
	</div>
    </header>
  )
}
export default Header;
