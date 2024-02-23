

export function Notification(props) {

    //"toast align-items-center text-bg-primary border-0"
        return (
            <div id='divNotificacion' className={props.Clase} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                {props.Mensaje}
                </div>
            </div>
        )
}