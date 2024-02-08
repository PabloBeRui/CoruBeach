//TODO vamos a crear un index que permita navegar entre las distintas paginas de 5 img cada una, añadiendo  los números necesarios dependiendo de la longitud del array

//TODO añadir al index primera y ultima pagina
//importamos el array de playas
import { beachArray } from "../../data/beachData.js";

//por defecto carga el array con todas las playas
export const indexRender = (userArray) => {
  let numIndex = Math.ceil(userArray.length / 4);
  // console.log(numIndex)
  let indexRenderDiv = document.createElement("div");
  indexRenderDiv.setAttribute("id", "indexRenderDiv");
  let indexUl = document.createElement("ul");
  indexUl.setAttribute("id", "indexUl");

  for (let i = 0; i < numIndex; i++) {
    let indexLi = document.createElement("li");
    indexLi.textContent = `${i + 1}`;
    indexLi.value = `${i + 1}`;
    indexLi.classList.add("indexLi");
    indexUl.appendChild(indexLi);
    // console.log(indexLi.value)
  }
  let prevLi = document.createElement("li");
  prevLi.classList.add("indexLi");
  prevLi.value = 1;
  prevLi.innerText = "<";
  let lastLi = document.createElement("li");
  lastLi.classList.add("indexLi");
  lastLi.value = numIndex;
  lastLi.innerText = ">";
  indexUl.prepend(prevLi);
  indexUl.appendChild(lastLi);

  indexRenderDiv.appendChild(indexUl);

  return indexRenderDiv;
};

//TODO si hay más de 5 paginas de index, sustiruir el 5 por ...(ultimo li del ul?)
