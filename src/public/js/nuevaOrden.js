



// let form = document.getElementById('form');
let form = document.forms.namedItem('form');

// Variables Cliente
let id_cliente = form['id_cliente'];
let dni = form['dni'];
let nombre = form['nombre'];
let telefono = form['telefono'];
let domicilio = form['domicilio'];

// Variables Equipo
let id_equipo_imei = form['id_equipo_imei'];
let imei = form['imei'];

let id_equipo = form['id_equipo'];
let modelo_exacto = form['modelo_exacto'];
let modelo_comercial = form['modelo_comercial'];
let marca = form['marca'];
let tipo_equipo = form['tipo_equipo'];

// Detalles y Falla del Equipo
let detalles = form['detalles'];
let fallas = form['fallas'];

// Detalles y Falla del Equipo
let usuario_nombre = form['usuario'];
let list_usuarios = document.getElementById('usuarios');
// let usuario_id = usuario_nombre.dataset.usuarioID;
// let usuario_rol = usuario_nombre.dataset.rol;

// Botones Form
let btn_buscar_cliente = form['buscar_cliente'];
let btn_vaciar_cliente = form['vaciar_cliente'];
let btn_editar_cliente = form['editar_cliente'];
let btn_buscar_equipo_imei = form['buscar_equipo_imei'];
let btn_buscar_equipo_modelo = form['buscar_equipo_modelo'];
let btn_crear_orden = form['crear_orden'];

btn_buscar_cliente.addEventListener('click', buscarClientePorDni);
btn_vaciar_cliente.addEventListener('click', vaciarForm);
btn_editar_cliente.addEventListener('click', editarClienteDatos);
btn_buscar_equipo_imei.addEventListener('click', buscarEquipoPorImei);
btn_buscar_equipo_modelo.addEventListener('click', buscarEquipoPorModelo);
btn_crear_orden.addEventListener('click', crearOrden);

form.addEventListener('submit', e => e.preventDefault());

/*
-- Setup Funciones FETCH
*/
function vaciarForm(e){
  e.preventDefault();
  id_cliente.value ='';
  dni.value ='';
  nombre.value ='';
  telefono.value ='';
  domicilio.value ='';
}
async function requestFetch(url, body) {
  let options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  }
  try {
    let response = await fetch(url, options)
    let data = await response.json();
    let { message } = data;
    showModalSuccess(message);
    return data;
  } catch (error) {
    showModalSuccess(error);
  }
}
/*
-- Funciones FETCH CRUD
*/
async function buscarClientePorDni(e){
  let url = e.target.getAttribute("formaction");
  let dniCliente = dni.value;
  let res = await requestFetch(url, { dniCliente });
  let { datosCliente } = res;
  if (datosCliente.length !== 0 && datosCliente.length == 1){
    rellenarInputsConDatosCliente(datosCliente[0]);
  };
  if (datosCliente.length !== 0 && datosCliente.length > 1) {
    showModalListResults(datosCliente);
  };
}
async function editarClienteDatos(e){
  let form_data = new FormData(form);
  let dataForm = Object.fromEntries(form_data);
  let { id_cliente, dni, nombre, telefono, domicilio } = dataForm;
  let clienteData = { id_cliente, dni, nombre, telefono, domicilio };
  let url = e.target.getAttribute("formaction");
  await requestFetch(url, clienteData);
}
async function buscarEquipoPorImei(e){
  let url = e.target.getAttribute("formaction");
  let imei_value = imei.value;
  let res = await requestFetch(url, {imei_value});
  let { datosEquipo } = res;
  if (datosEquipo.length !== 0 && datosEquipo.length == 1){
    rellenarInputsConDatosEquipoImei(datosEquipo[0]);
  };
  if (datosEquipo.length !== 0 && datosEquipo.length > 1) {
    showModalListResultsEquipo(datosEquipo);
  };
}
async function buscarEquipoPorModelo(e){
  let url = e.target.getAttribute("formaction");
  let modelo_exacto_buscar = modelo_exacto.value;
  let res = await requestFetch(url, {modelo_exacto_buscar});
  let { datosEquipo } = res;
  if (datosEquipo.length !== 0 && datosEquipo.length == 1){
    rellenarInputsConDatosEquipoImei(datosEquipo[0]);
  };
  if (datosEquipo.length !== 0 && datosEquipo.length > 1) {
    showModalListResultsEquipo(datosEquipo);
  };
}
async function crearOrden(e){
  let url = e.target.getAttribute("formaction");
  let form_data = new FormData(form);
  let dataForm = Object.fromEntries(form_data);
  let usuario_selected = list_usuarios.options.namedItem(dataForm.usuario);
  let usuario_id = usuario_selected.getAttribute('data-usuarioID');
  let usuario_rol = usuario_selected.getAttribute('data-rol');
  dataForm.usuario_id = usuario_id;
  dataForm.usuario_rol = usuario_rol;
  let res = await requestFetch(url, dataForm);
  let { id_orden } = res;
  if (id_orden !== undefined) {
    let url = 'http://localhost:3000/pdf/' + id_orden;
    window.open(url, '_blank');
    document.location.href = '/';
  }
}
/*
-- MODALS
*/

// Modal Success Busquedas y Peticiones FETCH a la Database
let modal_success = document.getElementById('sucess');
function showModalSuccess(message) {
  modal_success.textContent = message;
  function containsNO(str) {
    return (/NO/.test(str) || /YA/.test(str) || /ERROR/.test(str))
  }
  if (containsNO(message)) {
    modal_success.style.backgroundColor = '#F56853';
  }
  else{
    modal_success.style.backgroundColor = '#53F5AB';
  }
  modal_success.classList.toggle('invisible');
  setTimeout(()=>{
    modal_success.classList.toggle('invisible');
  }, 4000);
}

// Modal para Mostrar Resultados de Busqueda de Clientes
let modalCliente = document.getElementById('modalCliente');
let modalCliente_bg = document.getElementById('modalCliente_bg');
let modalClienteLista = document.getElementById('modalClienteLista');
let btn_ninguno = document.getElementById('btn_ninguno');

function toggleModal() {
  modalCliente_bg.classList.toggle('invisible');
  modalCliente.classList.toggle('invisible');
}
function btnPress(e) {
  let target = e.target;
  if(target.tagName === 'BUTTON') return target;
  if(target.tagName === 'SPAN') return target.parentNode;
  if(target.id == 'btn_ninguno') return 'ninguno';
  return undefined;
}
function showModalListResults(datosClientes) {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("#ListButtons").content;
  for (let cliente of datosClientes) {
    template.querySelector("button").id = cliente.id;
    template.querySelector("button").dataset.btn = 'btn';
    template.getElementById("clienteId").textContent = cliente.id;
    template.getElementById("clienteNombre").textContent = cliente.nombre;
    template.getElementById("clienteTelefono").textContent = cliente.telefono;
    template.getElementById("clienteDomicilio").textContent = cliente.domicilio;
    const clone = template.cloneNode(true);
    // const clone = document.importNode(template, true);
    fragment.appendChild(clone);
  }
  modalClienteLista.appendChild(fragment);
  toggleModal();
  function enviarData(e) {
    modalClienteLista.removeEventListener('click', enviarData);
    let btn_press = btnPress(e);
    if (btn_press !== undefined) {
      toggleModal();
      let cliente = datosClientes.find(e => e.id == btn_press.id);
      let listaBtns = document.querySelectorAll("[data-btn]");
      for (let btn of listaBtns) {
        let parent = btn.parentNode;
        parent.removeChild(btn);
      }
      rellenarInputsConDatosCliente(cliente);
    }
  };
  modalClienteLista.addEventListener('click', enviarData);
}
function showModalListResultsEquipo(datosEquipos) {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("#ListButtonsEquipos").content;
  // const span = template.querySelector("span");
  for (let equipo of datosEquipos) {
    let { id, marca, modelo_comercial, modelo_exacto, tipo_equipo } = equipo;
    let keys = [ marca, modelo_comercial, modelo_exacto, tipo_equipo ]
    const clone = template.cloneNode(true);
    const cloneButton = clone.querySelector("button");
    cloneButton.dataset.id_equipo_imei = id;
    for (let key of keys) {
      let span = document.createElement('span');
      span.textContent = key;
      // let cloneSpan = span.cloneNode(true)
      cloneButton.appendChild(span);
    }
    // const clone = document.importNode(template, true);
    fragment.appendChild(clone);
  }
  modalClienteLista.appendChild(fragment);
  toggleModal();
  function enviarData(e) {
    modalClienteLista.removeEventListener('click', enviarData);
    let btn_press = btnPress(e);
    let id_equipo_imei = btn_press.dataset.id_equipo_imei;
    if (btn_press !== undefined) {
      toggleModal();
      let equipo = datosEquipos.find(e => e.id == id_equipo_imei);
      let listaBtns = document.querySelectorAll("[data-id_equipo_imei]");
      for (let btn of listaBtns) {
        let parent = btn.parentNode;
        parent.removeChild(btn);
      }
      rellenarInputsConDatosEquipoImei(equipo);
    }
  };
  modalClienteLista.addEventListener('click', enviarData);
}
function rellenarInputsConDatosCliente(e) {
  if (e !== undefined) {
    id_cliente.value = e.id;
    nombre.value = e.nombre;
    telefono.value = e.telefono;
    domicilio.value = e.domicilio;
  }
  else{
    id_cliente.value ='';
    nombre.value ='';
    telefono.value ='';
    domicilio.value ='';
  }
}
function rellenarInputsConDatosEquipoImei(e) {
  if (e !== undefined) {
    if (e.id_equipo !== undefined) {
      id_equipo_imei.value = e.id;
      id_equipo.value = e.id_equipo;
      imei.value = e.imei;
    }
    else{
      id_equipo.value = e.id
    }
    modelo_exacto.value = e.modelo_exacto;
    modelo_comercial.value = e.modelo_comercial;
    marca.value = e.marca;
    tipo_equipo.value = e.tipo_equipo;
  }
  else{
    id_equipo_imei.value = '';
    id_equipo.value = '';
    modelo_exacto.value = '';
    modelo_comercial.value = '';
    marca.value = '';
    tipo_equipo.value = '';
  } 
}