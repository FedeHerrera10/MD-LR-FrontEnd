/* Crear una list para mostrar en la pantalla */
export const crearLista = (marca,modelo,puertas)=> {
  const li = document.createElement('li');
  li.innerHTML = `<b>Marca</b>: ${marca} - <b>Modelo</b>: ${modelo} - <b>Puertas</b>: ${puertas}`;
  return li;
}

export const crearOption = (select,text,value) => {
  const option = document.createElement('option');
  option.value=value;
  option.textContent=text;
  select.appendChild(option);
}

export const limpiarUI = (element) => {
  while(element.firstChild) element.removeChild(element.lastChild);
}

export const mensaje = (texto) => {
  alert(texto);
}