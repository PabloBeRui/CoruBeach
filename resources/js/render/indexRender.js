//TODO vamos a crear un index que permita navegar entre las distintas paginas de 10 img cada una, añadiendo  los números necesarios dependiendo de la longitud del array

//TODO añadir al index primera y ultima pagina
//importamos el array de playas
import { beachArray } from "../../data/beachData.js"


export const indexRender=() => {
   
    //let main = document.getElementById("main");
    let numIndex= Math.floor(beachArray.length/10);
    console.log(numIndex)
    let indexRenderDiv = document.createElement('div');
    let indexUl = document.createElement('ul')
    
    
  for(let i=0; i<numIndex; i++){
    let indexLi = document.createElement('li');
    indexLi.textContent = `${i+1}`;
    indexLi.classList.add("indexLi");
    indexUl.appendChild(indexLi);
  }
  indexRenderDiv.appendChild(indexUl);

  return indexRenderDiv;

}
//console.log(indexRender());
  