export function Cita(props) {
    let fecha = props.FechaCita;
    let placa = props.Placa;
    let estado = props.EstadoCita;
    let IdCita = props.IdCita;

    return (
        <div className="form-control">
            <div id={IdCita} className="row g-3">
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
                        <button type="button" className="btn btn-primary m-1" title="Reprogramar cita"><i className="bi bi-pencil-square"></i></button>
                        <button type="button" className="btn btn-danger m-1" title="Cancelar cita"><i className="bi bi-x-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
