export function BotonAccion(props) {
    return (
        <button id={props.Id} type="button" style={{marginRight: '10px'}} onClick={props.Event} className={props.Clase} title={props.Titulo}>
            <i className={props.Icono}></i> {props.TextoAccion}
        </button>
    );
}