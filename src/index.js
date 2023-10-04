window.onload = () => {
    console.log("page is fully loaded");
  };

fetch('/src/mocks/data.json')
  .then(response => response.json())
  .then(data => {
    const imagenes = data.imagenes.slice(0, 3);
    const rutaImagen = data.imagenes[3].ruta;
    const logoIco = document.querySelector('.logo-ico');
    logoIco.src = rutaImagen;
    const rutaImagen2 = data.imagenes[4].ruta;
    const mainIco = document.querySelector('.img-main')
    mainIco.src = rutaImagen2;
    imagenes.forEach((imagen, index) => {
      const img = document.querySelector(`.Gallery-${index + 1}`); 
      img.src = imagen.ruta;
      img.alt = imagen.nombre;
    });
    const codigo = data.codigo;
    eval(codigo);
  });