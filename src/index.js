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
      const cardInformation = data['Cards-info-card'][0];
      const eventos = obtenerEventos(data);
      const footer = obtenerFooter(data);
      mostrarImagenes(imagenes);
      mostrarLogo(rutaLogo);
      mostrarImagenPrincipal(rutaImagenPrincipal);
      ejecutarCodigo(codigo);
      mostrarEventos(eventos);
      mostrarFooter(footer);
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
  const logoIco2 = document.querySelector('.icon-logo2');
  logoIco2.src = rutaLogo;
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

  const img = document.createElement('img');
  img.src = evento.path;
  img.alt = evento.title;
  img.id = 'imagen-' + evento.id;
  eventDiv.appendChild(img);

  const titulo = document.createElement('h3');
  titulo.textContent = evento.title;
  titulo.id = 'titulo-' + evento.id;
  eventDiv.appendChild(titulo);

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
function obtenerFooter(data) {
  return data['Footer-info-card'][0];
}

function mostrarFooter(footerInfo) {
  const footerTitle = document.querySelector('.ti');
  const footerTitle2 = document.querySelector('.ti2');
  const footerTitle3 = document.querySelector('.ti3');
  const footerSubtitle = document.querySelector('.sub');

  const footerDescription = document.querySelector('.des');
  const footerDescription2 = document.querySelector('.des2');
  const footerEmail = document.querySelector('.correo');
  const footerEmail2 = document.querySelector('.correo2');
  
  footerTitle.textContent = footerInfo.title1;
  footerSubtitle.textContent = footerInfo.description;
  footerDescription.textContent = footerInfo.subtitle;
  footerDescription2.textContent = footerInfo.subtitle2;
  footerTitle2.textContent = footerInfo.title2;
  footerTitle3.textContent = footerInfo.title3;
  footerEmail.textContent = footerInfo.correo1;
  footerEmail2.textContent = footerInfo.correo2;
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

function mostrarServicios(imagenes) {
  imagenes.forEach((imagen, index) => {
    const img = document.querySelector(`.Gallery-${index + 1}`);
    img.src = imagen.ruta;
    img.alt = imagen.nombre;
  });
}
