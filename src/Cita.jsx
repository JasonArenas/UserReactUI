import { BotonAccion } from './BotonAccion.jsx'
import $ from 'jquery'

export function Cita(props) {

    let fecha = props.FechaCita;
    let placa = props.Placa;
    let estado = props.EstadoCita;
    let IdCita = props.IdCita;

    const handleEventFromParent = () => {
        props.activateEffect();
    }

    return (
        <div className="form-control">
            <div className="row g-3">
                <div className="col-md-3 d-flex">
                    <i className="bi bi-aspect-ratio-fill" style={{fontSize: '20px', color: 'red', marginRight: '2%'}}></i>
                    <label className="form-label" style={{ fontSize: '14px' }}><b>{placa}</b></label>
                </div>
                <div className="col-md-3 d-flex">
                    <i className="bi bi-calendar-week-fill" style={{fontSize: '20px', color: 'cornflowerblue', marginRight: '2%'}}></i>
                    <label className="form-label" style={{ fontSize: '14px' }}><b>{fecha}</b></label>
                </div>
                <div className="col-md-3 d-flex">
                    <i className="bi bi-bookmark-fill" style={{fontSize: '20px', color: 'green', marginRight: '2%'}}></i>
                    <label className="form-label" style={{ fontSize: '14px' }}><b>{estado}</b></label>
                    <br />
                </div>
                <div className="col-md-3 d-flex">
                    <div>
                        <BotonAccion Event={ckMarcarAtendida} Clase={'btn btn-success m-1'} Titulo={'Marcar como atendida'} Icono={'bi bi-check2-circle'} />
                        <BotonAccion Event={ckShowReprogramar} Clase={'btn btn-primary m-1'} Titulo={'Reprogramar cita'} Icono={'bi bi-pencil-square'} />
                        <BotonAccion Event={ckCancelarCita}Clase={'btn btn-danger m-1'} Titulo={'Cancelar cita'} Icono={'bi bi-x-lg'} />
                    </div>
                </div>
            </div>
        </div>
    );
    
    async function ckCancelarCita() {      
        await fetch(`http://localhost:5286/api/CancelarCita/${IdCita}`)
        .then(response => response.json())
        .then(result => () => {
            // == Enviar actualizar el resumen ==
        })
        .catch(error => console.log('error', error));

        handleEventFromParent();
    //==================================================================================================================
    }
    function ckShowReprogramar() {
        document.getElementById('hddnReprogram').value = IdCita;
        $('.modal').show();
    }
    //==================================================================================================================    
    async function ckMarcarAtendida(){        
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = JSON.stringify({
        "IdCita": IdCita
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

        await fetch("http://localhost:5286/api/CitaAtendida", requestOptions)
        .then(response => response.text())
        .then(result => () => {
          console.log(result);
          // == Enviar actualizar el resumen ==
        })
        .catch(error => console.log('error', error));
        
        //== Forzar actualización del resumen ==
        handleEventFromParent();
    //==================================================================================================================
    }
    //==================================================================================================================
}
