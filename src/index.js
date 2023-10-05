window.onload = () => {
  console.log('La página se ha cargado completamente');
  cargarImagenes();
};

function cargarImagenes() {
  fetch('/src/mocks/data.json')
    .then(response => response.json())
    .then(data => {
      const eventosInfo = obtenerEventosInfo(data);
      mostrarEventosInfo(eventosInfo);
      const imagenes = data.imagenes.slice(0, 3);
      const rutaLogo = data.imagenes[3].ruta;
      const rutaImagenPrincipal = data.imagenes[4].ruta;
      const codigo = data.codigo;
      const eventos = obtenerEventos(data);
      mostrarImagenes(imagenes);
      mostrarLogo(rutaLogo);
      mostrarImagenPrincipal(rutaImagenPrincipal);
      ejecutarCodigo(codigo);
      mostrarEventos(eventos);
    })
    .catch(error => {
      console.error('Error al cargar las imágenes:', error);
    });
}

function mostrarImagenes(imagenes) {
  imagenes.forEach((imagen, index) => {
    const img = document.querySelector(`.Gallery-${index + 1}`);
    img.src = imagen.ruta;
    img.alt = imagen.nombre;
  });
}

function mostrarLogo(rutaLogo) {
  const logoIco = document.querySelector('.logo-ico');
  logoIco.src = rutaLogo;
}

function mostrarImagenPrincipal(rutaImagenPrincipal) {
  const mainIco = document.querySelector('.img-main');
  mainIco.src = rutaImagenPrincipal;
}

function ejecutarCodigo(codigo) {
  const output = eval(codigo);
  console.log(output);
}

function obtenerEventos(data) {
  return data.events;
}

function mostrarEventos(eventos) {
  const eventsContainer = document.querySelector('.events-cards');
  eventos.forEach(evento => {
    const eventDiv = crearEventoDiv(evento);
    eventsContainer.appendChild(eventDiv);
  });
}

function crearEventoDiv(evento) {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('item-events');
  eventDiv.style.backgroundImage = `url(${evento.path})`;
  eventDiv.innerHTML = `<h3>${evento.title}</h3>`;
  return eventDiv;
}

function obtenerEventosInfo(data) {
  return data.eventsInfo[0];
}

function mostrarEventosInfo(eventosInfo) {
  const infoTitle = document.querySelector('.infoTitle');
  const infoSubtitle = document.querySelector('.infoSubtitle');
  const infoDescription = document.querySelector('.infoDescription');
  infoTitle.textContent = eventosInfo.title;
  infoSubtitle.textContent = eventosInfo.subtitle;
  infoDescription.textContent = eventosInfo.description;
}

const formulario = document.querySelector('#formulario');
const botonContinuar = document.querySelector('#boton-continuar');

botonContinuar.addEventListener('click', () => {
  const datos = {
    nombre: formulario.nombre.value,
    telefono: formulario.telefono.value,
    email: formulario.email.value
  };
  guardarDatos(datos);
});

function guardarDatos(datos) {
  fetch('/src/mocks/data.json')
    .then(response => response.json())
    .then(data => {
      data.datos.push(datos);
      return fetch('/src/mocks/data.json', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    })
    .then(response => {
      console.log('Datos guardados exitosamente');
    })
    .catch(error => {
      console.error('Error al guardar los datos:', error);
    });
}