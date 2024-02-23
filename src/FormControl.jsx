export function FormControl(props) {
    let controlContent = "";
    
    if(props.Tipo === 'Texto'){
        controlContent = (
            <div className="col">
                <label htmlFor={props.Id} className="form-label">{props.Etiqueta}</label>
                <input id={props.Id} type="text" placeholder={props.PlaceHolder} className="form-control" />
            </div>
        )
    }
    else if(props.Tipo === 'Fecha'){
        controlContent = (
            <div className="col-md-6">
                <label htmlFor={props.Id} className="form-label">Fecha de cita</label>
                <input id={props.Id} type="date" className="form-control" />
            </div>
        )
    }
    else if(props.Tipo === 'Tiempo'){
        controlContent = (
            <div className="col-md-6">
                <div>
                    <label htmlFor={props.Id} className="form-label">Hora de cita</label>
                    <select id={props.Id} className="form-select col-md-6">
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                    </select>
                </div>
            </div>
        )
    }
    

    return (
        controlContent
    )
}