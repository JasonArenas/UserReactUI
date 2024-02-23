import { useState } from 'react'
import { BotonAccion } from './BotonAccion.jsx'
import { ResumenCitas } from './ResumenCitas.jsx'
import { FormControl } from './FormControl.jsx'
import { Modal } from './Modal.jsx'
import $ from 'jquery'
import './App.css'

function App() {
  const [filter, setFilter] = useState('');
  const [refreshChild, setRefreshChild] = useState(false);

  //================================================================================================================
  // == EVENTOS ==
  //================================================================================================================
  function handleChange(e) {
    setFilter(e.target.value);
  }

  // == Forzando la actualización del hijo para refrescar el resumen aunque no haya cambios de estado ==
  const handleButtonClick = () => {
      setRefreshChild(prevState => !prevState);
  };
  //================================================================================================================

  return (
    <>
        <div className="container">
        <h2>Portal - Citas de mantenimiento</h2>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#e3f2fd' }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a id="linkResumen" className="nav-link active" style={{cursor: 'pointer'}} title='Ver resumen' aria-current="page" onClick={ckMostrarResumen}>Home</a>
                </li>
                <li className="nav-item">
                  <a id="linkCreacion" className="nav-link" style={{cursor: 'pointer'}} title='Crear nueva cita' onClick={ckMostrarCrearCita}>Agendar</a>
                </li>
                <li className="nav-item">
                  <a id="linkVerVehiculo" className="nav-link" style={{cursor: 'pointer'}} title='Ver detalles de vehículo' onClick={ckVerVehiculo}>Vehículo</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input id='txtBusqueda' onChange={handleChange} className="form-control me-2" type="search" placeholder="Ingresar No. de placa" aria-label="Search" />
              </form>
            </div>
          </div>
        </nav>

        <div id="tab1" className="tab-content clsResumen">

        <ResumenCitas FiltroLista={filter} refreshChild={refreshChild} />
        
        </div>
        <div id="tab2" className="tab-pane clsCreacion" style={{display: 'none'}}>
          <div className="card">
            <div className="card-head">
              <b>Creación de nueva cita</b>
            </div>
            <div className="card-body">
              <div className="form-control row">
                <div className="mb-3">
                  <label htmlFor="txtplaca" className="form-label">No. de placa</label>
                  <FormControl Id={'txtplaca'} Tipo={'Texto'} PlaceHolder={'Ingrese la placa del vehiculo'} />
                </div>
                <div className="row g-3">
                  <FormControl Id={'txtFechaCita'} Tipo={'Fecha'} />
                  <FormControl Id={'lstHoraCita'} Tipo={'Tiempo'} />
                </div>
              </div>
              <br />
              <div className="form-control">
                <div>
                  <BotonAccion Event={ckShowCrearCita} Clase={'btn btn-primary'} Titulo={'Crear cita'} Icono={'bi bi-calendar-week-fill'} TextoAccion={'Crear cita'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tab3" className="tab-pane clsVerVehiculo" style={{display: 'none'}}>
          <div className="card">
              <div className="card-head">
                <b>Detalles del vehículo</b>
              </div>
              <div className="card-body">
                <div className="form-control row">
                </div>
              </div>
          </div>
        </div>
      </div>
      <br />
      <Modal Evento={ckShowReprog} ModalTitle={'Reprogramar la cita'} ModalBody={'Por favor selecciona la fecha y la hora de la cita.'} />
    </>
  )

  function RemoveActive() {
    $('#linkResumen').removeClass('active');
    $('#linkCreacion').removeClass('active');
    $('#linkVerVehiculo').removeClass('active');
  }
  function ckMostrarResumen() {
    RemoveActive();
    $('.clsResumen').css({display: 'block'});
    $('.clsCreacion').css({display: 'none'});
    $('.clsVerVehiculo').css({display: 'none'});

    $('#linkResumen').addClass('active');
  }
  function ckMostrarCrearCita() {
    RemoveActive();
    $('.clsResumen').css({display: 'none'});
    $('.clsCreacion').css({display: 'block'});
    $('.clsVerVehiculo').css({display: 'none'});

    $('#linkCreacion').addClass('active');
  }
  function ckVerVehiculo() {
    RemoveActive();
    $('.clsResumen').css({display: 'none'});
    $('.clsCreacion').css({display: 'none'});
    $('.clsVerVehiculo').css({display: 'block'});

    $('#linkVerVehiculo').addClass('active');
  }
  async function ckShowCrearCita(){
    // == mostrar el modal ==
    let txtplaca = document.getElementById('txtplaca').value;
    let txtFechaCita = document.getElementById('txtFechaCita').value;
    let opcHoraCita = document.getElementById('lstHoraCita').value;

    // == FORMATEANDO LA FECHA CON LA HORA ==
    let FechaNuevaCita = FormatoFecha(txtFechaCita, opcHoraCita);
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = JSON.stringify({
        "noPlaca": txtplaca,
        "fechaCita": FechaNuevaCita
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      fetch("http://localhost:5286/api/CrearCita", requestOptions)
        .then(response => response.text())
        .then(result => () => {
          console.log(result);
          // == Enviar actualizar el resumen ==
          setFilter();
        })
        .catch(error => console.log('error', error));
        
        //== Forzar actualización del resumen ==
        handleButtonClick();
    //==================================================================================================================
  }

  function ckShowReprog(){
    // == mostrar el modal ==
    let fechaReprog = document.getElementById('fechaReprog').value;
    let horaReprog = document.getElementById('horaReprog').value;
    let rowIdCita = document.getElementById('hddnReprogram').value;

    $('.modal').hide();
    
    // == FORMATEANDO LA FECHA CON LA HORA ==
    let FechaModificada = FormatoFecha(fechaReprog, horaReprog);
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var data = JSON.stringify({
        "IdCita": rowIdCita,
        "FechaCita": FechaModificada
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      fetch("http://localhost:5286/api/ReprogramarCita", requestOptions)
        .then(response => response.text())
        .then(result => () => {
          console.log(result);
          // == Enviar actualizar el resumen ==
        })
        .catch(error => console.log('error', error));

        //== Forzar actualización del resumen ==
        handleButtonClick();
    //==================================================================================================================
  }

  function FormatoFecha(fechaString, horaString){

    // Separar la fecha en partes (año, mes y día)
    var fechaPartes = fechaString.split("-");

    // Separar la hora en partes (hora, minutos)
    var horaPartes = horaString.split(":");

    // Crear un objeto de fecha utilizando las partes obtenidas
    var FechaFormateada = new Date(
      parseInt(fechaPartes[0]),  // Año
      parseInt(fechaPartes[1]) - 1, // Mes (se resta 1 porque los meses van de 0 a 11)
      parseInt(fechaPartes[2]), // Día
      parseInt(horaPartes[0]),  // Hora
      parseInt(horaPartes[1])   // Minutos
    );

    //==================================================================================================================
    var fecha = new Date(FechaFormateada);
    
    // Restar 5 horas a la fecha
    fecha.setHours(fecha.getHours() - 5);

    // Obtener la hora local en formato ISO 8601
    var ultfechaFormateada = fecha.toISOString().replace('Z', '');
    //==================================================================================================================

    return ultfechaFormateada;
  }

}

export default App
