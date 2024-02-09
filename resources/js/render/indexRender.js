// Creamos un index que permita navegar entre las distintas paginas de 4 img cada una, añadiendo  los números necesarios dependiendo de la longitud del array
// añadimos al index primera y ultima pagina

export const indexRender = (userArray) => {
  //creamos variable cuyo valor sera el numero de paginas a renderizar

  let numIndex = Math.ceil(userArray.length / 4);

  //Creamos un div donde se incluira el ul que tambien creamos y le damos un id
  let indexRenderDiv = document.createElement("div");
  indexRenderDiv.setAttribute("id", "indexRenderDiv");
  let indexUl = document.createElement("ul");
  indexUl.setAttribute("id", "indexUl");

  //Hacemos un bucle que renderizará cada li necesario, con el número de página y lo añadimos al ul creado anteriormente
  for (let i = 0; i < numIndex; i++) {
    let indexLi = document.createElement("li");
    indexLi.textContent = `${i + 1}`;
    indexLi.value = `${i + 1}`;
    indexLi.classList.add("indexLi");
    indexUl.appendChild(indexLi);
  }

  //Creamos los botones de primera y ultima pagina y lo añadimos al ul
  let firstLi = document.createElement("li");
  firstLi.classList.add("indexLi");
  firstLi.value = 1;
  firstLi.innerText = "Inicio";
  let lastLi = document.createElement("li");
  lastLi.classList.add("indexLi");
  lastLi.value = numIndex;
  lastLi.innerText = "Fin";

  // TODO Creamos los botones prev y post

  indexUl.prepend(firstLi);
  indexUl.appendChild(lastLi);

  indexRenderDiv.appendChild(indexUl);

  return indexRenderDiv;
};
