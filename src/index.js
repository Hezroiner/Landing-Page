window.onload = () => {
    console.log("page is fully loaded");
  };
  
  fetch('/src/mocks/data.json')
    .then(response => response.json())
    .then(data => {
      const codigo = data.codigo;
      eval(codigo); 
    });