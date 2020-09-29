import React,{useState, useContext} from 'react'
import appContext from '../context/app/appContext'

const Formulario = () =>{
  const [tienePassword, setTienePassword] = useState(false);
    const {agregarPassword, agregarDescargas} = useContext(appContext);
  return(
    <div className="w-full mt-20">
    <div>
    <label className="text-lg text-gray-800">Eliminar tras: </label>
    <select onChange={e => agregarDescargas(parseInt(e.target.value))} className="appeareance-none mt-2 w-full border border-gray-400 bg-white text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"> 
      <option value ="" selected disabled> ----Seleccione ----  </option>
      <option value ="1" >  1 Descargas  </option>
      <option value ="5" >  5 Descargas  </option>
      <option value ="10" >  10 Descargas  </option>
      <option value ="20" >  20 Descargas  </option>

    </select>
    </div>
    <div className="mt-4">
    <div className="flex justify-between items-center">
    <label className="text-lg text-gray-800 mr-2 "> Proteger con Password </label>
    <input type="checkbox" onChange={() => setTienePassword(!tienePassword)} />
    	</div>
    {tienePassword ? (
<input type="password" onChange={e => agregarPassword(e.target.value)} className="appeareance-none mt-2 w-full border border-gray-400 bg-white text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
      placeholder="Agrega el password..."
    />
    ): null}


      </div>
    </div>
  )
}

export default Formulario;
