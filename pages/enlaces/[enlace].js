import Layout from '../../components/Layout'
import ClienteAxios from '../../config/axios'
import React,{useState, useContext} from 'react'

  export async function getServerSideProps({params}){
      const {enlace} = params;
      const resultado = await ClienteAxios.get(`/api/enlaces/${enlace}`);
    return{
      props: {
	enlace: resultado.data
      }
    }

  }

  export async function getServerSidePaths(){
  
    const resultado = await ClienteAxios.get('/api/enlaces');
    return{
	paths: resultado.data.enlaces.map(enlace => ({
	  params: {enlace: enlace.url}  
	})),
	fallback: false
    }
}




export default ({enlace}) => {

    const [tienepassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');
    const [mensaje, setMsg] = useState('');  
    const data ={
      password
    }
    const verificarPassword = async (e) =>{
    e.preventDefault();
      try{
    const resultado = await ClienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
	setTienePassword(resultado.data.password);
      }catch(error){
	setMsg(error.response.data.msg);
	setTimeout(()=>{
	  setMsg('');
	},3000)
      }

}
  return(
      <Layout>
      {tienepassword ? (
	<>
	  <p className="text-gray-700 text-center mb-5">Este enlace esta protegido por Password: </p>
	      { mensaje && (<div className="bg-red-500 py-2 px-3 my-3 w-full max-w-lg text-center text-white mx-auto">
	      {mensaje}
	      </div> )}
	  <div className="flex justify-center mt-5">
	  <div className="w-full max-w-lg">
	         <form className="bg-white rounded shadow-md px-10 pt-6 pb-8 mb-4"
		  onSubmit={e => verificarPassword(e)}
	      >
		<div className="mb-4">
		    <label className="block text-black text-sm font-bold mb-2" htmlFor="password"> Password</label>
		    <input 
			type="password"
			name="password"
			id="password"
			value={password}
			onChange={e => setPassword(e.target.value)}
			className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: shadow-outline"
			placeholder="Password de Usuario.."
		    />
	      </div>
         <input type="submit" 
		    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded"
		    value="Validar Password"
		/>
	    </form>

	  </div>
	</div>
	</>
      ):(
	<>
    <h1 className="text-4xl text-gray-700 text-center">Descarga tu Archivo: </h1>
    <div className="align-items-center justify-center flex mt-10">
    <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer" download> aqui</a>
    </div>
	</>
      )}
    
      </Layout>
  )
  
}
