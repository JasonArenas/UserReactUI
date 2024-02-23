import { useEffect, useState } from 'react'
import { Cita } from "./Cita.jsx"
import $ from 'jquery'

export function ResumenCitas(props) {
    const [citaData, setCitaData] = useState([]);

    let NotificationClase = '';
    let NotificationMessage = '';

    //====================================================================================================
    // == POPULAR VARIABLE DE ESTADO PARA GENERAR LOS ELEMENTOS POR CADA CITA CREADA ==
    //====================================================================================================
    useEffect( () => {
        (async()=>{
            populateListarCitas(props.FiltroLista);
        })()
       
    }, [props.FiltroLista, props.refreshChild]);

    const activateParentEffect = () => {
        // Función que activa el efecto en el padre
        populateListarCitas(props.FiltroLista);
      };
    //====================================================================================================

    let contentResume = "Cargando...";
    if(citaData.length > 0){
        contentResume = (
            <div>
                <h2>Resumen de citas</h2>
                <div>
                    <br />
                    <input id='hddnReprogram' type='hidden' />
                    {citaData.map(datcita => <Cita key={datcita.idCita} activateEffect={activateParentEffect} IdCita={datcita.idCita} Placa={datcita.noPlaca} EstadoCita={datcita.estadoCita} FechaCita={datcita.fechaCita} />)}
                </div>
            </div>
        );
    }
    else{
        contentResume = (
            <div>
                <h2>Resumen de citas</h2>
                <div>
                    <br />
                    <h4><b>Sin resultados que mostrar</b></h4>
                </div>
                <div id='divNotificacion' className={NotificationClase} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {NotificationMessage}
                    </div>
                </div>
            </div>
        )
    }

    return (
        contentResume
    )
    
  async function populateListarCitas(placa){
    let urlConsulta = "";

    if(placa.length > 0){
        urlConsulta = `http://localhost:5286/api/ListarCita/${placa}`;
    }
    else{
        urlConsulta = 'http://localhost:5286/api/ListarCitas';
    }
    const resp = await fetch(urlConsulta).then(response => response.json());
    const data = await resp.results;
    setCitaData(data);
  }
}