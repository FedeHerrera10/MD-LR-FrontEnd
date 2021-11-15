import {autosDisponibles} from './datos.js';
import {crearLista,crearOption,limpiarUI,mensaje} from './ui.js'

const list = document.querySelector('.list');
const btn4Puertas = document.querySelector('#btn-4-puertas');
const btnComprar = document.querySelector('#comprar');
const selectMarca = document.querySelector('#marca');
const selectModelo = document.querySelector('#modelo');
const selectPuertas = document.querySelector('#puertas');
let arrAutosDisponibles =autosDisponibles;

/* Funcion que se encarga de cargar el array de autos*/
const cargarAutos = (arrAutos = []) => {

  if(arrAutos.length ==0){
    console.log('No hay autos disponibles')
    return;
  }
  console.log('#####################################');
  console.log('Autos Disponibles');
  console.log('#####################################');
  arrAutos.forEach(element => {
      const {marca,modelo,puertas} = element
      list.appendChild(crearLista(marca,modelo,puertas))
      console.log(`Tenemos un auto disponible Modelo:${modelo} -  Marca: ${marca} - Puertas ${puertas} `)
  });
}
/* Funcion que carga los autos en pantalla y los muestr en la lista */
cargarAutos(arrAutosDisponibles);

const filtrarAutosPorPuertas = (puertas) => {
  const autosPuertaGenaro = arrAutosDisponibles.filter(auto => auto.puertas <=puertas);
  console.log('#####################################');
  console.log('Autos '+puertas+ 'puertas o menos');
  console.log('#####################################');
  limpiarUI(list);
  cargarAutos(autosPuertaGenaro)

}

/*Evento click en boton auto 4 puertas o menos */
btn4Puertas.addEventListener('click' , () =>{
  filtrarAutosPorPuertas(4);
})

selectMarca.addEventListener('change',e =>{
  const autosMarcaPuertaGenaro  =autosPuertaGenaro(e.target.value);
  cargarAutos(autosMarcaPuertaGenaro);
})

selectPuertas.addEventListener('change',e =>{
  const puerta = e.target.value;
  const marca= selectMarca.value;
  const filtroAutoMarcaPuertas = arrAutosDisponibles.filter(autos => (autos.marca == marca && autos.puertas==puerta) )
  limpiarUI(list);
  limpiarUI(selectModelo);
  cargarAutos(filtroAutoMarcaPuertas);
  crearOption(selectModelo,'');
  filtroAutoMarcaPuertas.map(auto => {
    crearOption(selectModelo,auto.modelo);
  })
})

selectModelo.addEventListener('change',e =>{
  console.log(e.target.value)
    if(e.target.value == 'Mustang'){
      const autoComprado=autoCompradoFilter();
      console.log(autoComprado)
      const texto = `Felicitaciones Genaro por haber adquirido tu nuevo y flamante ${autoComprado.marca} ${autoComprado.modelo} que disfrutes tus ${autoComprado.puertas} puertas`
      mensaje(texto);
      limpiarUI(selectModelo);
      arrAutosDisponibles = autosDisponibles.filter(auto => auto.modelo !== 'Mustang');
    }

}
)



/* Carga el select puertas para los modelos pasado por parametros */

const autosPuertaGenaro = (value) => {
  limpiarUI(selectPuertas);
  limpiarUI(list)
  crearOption(selectPuertas,'');

  const arr = arrAutosDisponibles.filter(auto => (auto.marca == value));
  let autosMap = arr.map(item=>{
      return [item.puertas,item]
  });


  let autosMapArr = new Map(autosMap); // Pares de clave y valor

  let autosMarcaPuertaGenaro = [...autosMapArr.values()]; // Conversión a un array

  autosMarcaPuertaGenaro.map(auto => crearOption(selectPuertas,auto.puertas));
  return arr;
}


/* Comprar Auto */

const autoCompradoFilter = () => {
  const autoComprado=autosDisponibles.filter(auto => (auto.marca == selectMarca.value && auto.modelo === 'Mustang'));
  return autoComprado[0];
}