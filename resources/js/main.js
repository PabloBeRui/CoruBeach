//TODO showWheather-> boton para mostrar u ocultar

//TODO cargar imagenes de 10 en 10, hay que crear un listado donde se pueda pinchar y elegir. para hacer esto tenemos que modificar el bucle for of y tenemos que añadir el indice abajo.

//Importamos el array de playas (beachArray)

import { beachArray } from "../data/beachData.js";
import { indexRender } from "./render/indexRender.js";
import { weatherRender } from "./render/weatherRender.js";

export const main = () => {
  let mainButton = document.getElementById("mainButton");

  let main = document.getElementById("main");
  let cardsContainerDiv = document.createElement("div");
  cardsContainerDiv.setAttribute("id", "cardsContainerDiv");

  //!Creamos los componentes del buscador
  let searchDiv = document.createElement("div");
  let searchInput = document.createElement("input");
  let searchButton = document.createElement("button");

  searchButton.innerText = "Buscar";
  searchButton.id = "searchButton";

  searchInput.placeholder = "Busca tu playa";
  searchInput.id = "searchInput";

  //! función que renderiza las cards
  async function renderMain(userArray) {
    for (let beach of userArray) {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("cardDiv");

      let imgCard = document.createElement("img");
      imgCard.classList.add("imgCard");
      imgCard.setAttribute(
        "src",
        `./resources/img/beaches/${beach.photo}.jpeg`
      );

      let pCard = document.createElement("p");
      pCard.classList.add("pCard");
      pCard.innerText = `${beach.beachName}`;

      cardDiv.appendChild(imgCard);
      cardDiv.appendChild(pCard);
      cardsContainerDiv.appendChild(cardDiv);

      //importamos weatherRender, y lo añadimos al contenedor de las cards
      let beachId = beach.id;

      const weatherDiv = await weatherRender(beachId);

      cardDiv.appendChild(weatherDiv);
    }
    let indexDiv = indexRender();
    main.appendChild(indexDiv);
  }
  // Cuando se aprieta el boton , hacemos que desaparezca el propio boton y cargue un nuevo div, que será el contenedor de las cartas

  mainButton.addEventListener("click", () => {
    mainButton.style.display = "none";
    searchDiv.append(searchInput, searchButton);
    main.appendChild(searchDiv);

    main.appendChild(cardsContainerDiv);

    renderMain(beachArray);
  });

  searchButton.addEventListener("click", () => {
    if (searchInput.value === "") {
      cardsContainerDiv.innerHTML = "";
      renderMain(beachArray);
    } else {
      //Filtramos el array con el valor que nos pasa el usuario en el input y hacemos un nuevo renderizado con el array filtrado
      let userInput = searchInput.value.toLowerCase();
      let filtered = beachArray.filter((beach) =>
        beach.beachName.toLowerCase().includes(userInput)
      );

      if (filtered.length === 0) {
        alert("No se ha encontrado ningún resultado");
        return;
      }
      cardsContainerDiv.innerHTML = "";
      renderMain(filtered);
    }
  });
};

main();
