import { useEffect, useState } from 'react'
import { Cita } from "./Cita";

export function ResumenCitas() {
    const [citaData, setCitaData] = useState();

    useEffect( () => {
        (async()=>{
            await populateListarCitas();
        })()
       
    }, [citaData]);

    if(citaData != undefined){
        return (
            <div>
                <h2>Resumen de citas</h2>
                <div>
                    {citaData.map(datcita => <Cita key={datcita.idCita} IdCita={datcita.idCita} Placa={datcita.noPlaca} EstadoCita={datcita.estadoCita} FechaCita={datcita.fechaCita} />)}
                </div>
            </div>
        );
    }
    
  async function populateListarCitas(){
    const resp = await fetch('http://localhost:5286/api/ListarCitas').then(response => response.json());
    const data = await resp.results;
    setCitaData(data);
  }

 function buscar() {
    alert("buscando...");
 }
}