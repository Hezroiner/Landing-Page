window.onload = () => {
  console.log("page is fully loaded");
};

const cargarGallery = async () => {
  const response = await fetch('/src/mocks/data.json');
  const data = await response.json();
  const imagenes = data.imagenes.slice(0, 3);

  imagenes.forEach((imagen, index) => {
    const img = document.querySelector(`.Gallery-${index + 1}`);
    img.src = imagen.ruta;
    img.alt = imagen.nombre;
  });
};

// Ejecutar el código
const ejecutarCodigo = async () => {
  const response = await fetch('/src/mocks/data.json');
  const data = await response.json();
  const codigo = data.codigo;
  eval(codigo);
};

// Iniciar las tareas
cargarImagenes();
ejecutarCodigo();
