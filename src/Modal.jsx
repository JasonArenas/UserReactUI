import { FormControl } from "./FormControl.jsx"
import { BotonAccion } from "./BotonAccion.jsx"
import $ from 'jquery'

export function Modal(props) {

    return (
        <>
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.ModalTitle}</h5>
                    <BotonAccion Event={CerrarModal} Clase={'btn-close'} Titulo={'Cerrar'} />
                </div>
                <div className="modal-body">
                    <p><b>{props.ModalBody}</b></p>
                    <br />
                    <div>
                        <div className="row g-3">
                            <FormControl Id='fechaReprog' Tipo={'Fecha'} />
                            <FormControl Id='horaReprog' Tipo={'Tiempo'} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                  <BotonAccion Event={props.Evento} Clase={'btn btn-primary'} Titulo={'Reprogramar cita'} Icono={'bi bi-calendar-week-fill'} TextoAccion={'Reprogramar'} />
                  <BotonAccion Event={CerrarModal} Clase={'btn btn-danger mr-3'} Titulo={'Cancelar'} Icono={'bi bi-x-circle'} TextoAccion={'Cancelar'} />
                </div>
                </div>
            </div>
        </div>
        </>
    )
    function CerrarModal(){
        $('.modal').hide();
    }
}