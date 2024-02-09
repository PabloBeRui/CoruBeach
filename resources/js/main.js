//Importamos el array de playas (beachArray)
import { beachArray } from "../data/beachData.js";
import { indexRender } from "./render/indexRender.js";
import { weatherRender } from "./render/weatherRender.js";

//Seleccionamos componentes; main, buttonMain, header y creamos un  div al que le damos
//una id
export const main = () => {
  let mainButton = document.getElementById("mainButton");

  let main = document.getElementById("main");
  let header = document.getElementById("header");
  let cardsContainerDiv = document.createElement("div");
  cardsContainerDiv.setAttribute("id", "cardsContainerDiv");
  //Declaramos la variable global indexDiv, que utilizaremos más adelante
  let indexDiv;

  //Creamos los componentes del buscador y le damos atributos
  let searchDiv = document.createElement("div");
  let searchForm = document.createElement("form");
  let searchInput = document.createElement("input");
  let searchButton = document.createElement("button");

  searchForm.setAttribute("id", "searchForm");

  searchButton.innerText = "Buscar";
  searchButton.id = "searchButton";

  searchInput.placeholder = "Busca tu playa";
  searchInput.id = "searchInput";

 

  //! Función que renderiza las cards

  async function renderMain(userArray, indexValue = 1) {
    //Obtenemos el último elemento de la página que nos indica el usuario y seleccionamos los 4 elementos anteriores que queremos mostrar
    let lastElement = indexValue * 4;
    let slicedArray = userArray.slice(lastElement - 4, lastElement);
    //Hacemos un for of que cree los 4 elementos requeridos con la informacion
    // del slicedArray
    for (let beach of slicedArray) {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("cardDiv");

      //creamos un div donde estarán las imagenes de la card

      let cardDivImages = document.createElement("div");
      cardDivImages.classList.add("cardDivImages");
      // Creamos las imágenes
      let imgCard = document.createElement("img");
      imgCard.classList.add("imgCard");
      imgCard.setAttribute(
        "src",
        `./resources/img/beaches/${beach.photo}.jpeg`
      );

      let imgCard2 = document.createElement("img");
      imgCard2.classList.add("imgCard");
      imgCard2.setAttribute(
        "src",
        `./resources/img/beaches/${beach.photo}b.jpeg`
      );
      //Creamos una p con el nombre de la playa
      let pCard = document.createElement("p");
      pCard.classList.add("pCard");
      pCard.innerText = `${beach.beachName}`;
      cardDivImages.append(imgCard, imgCard2);
      cardDiv.appendChild(cardDivImages);
      cardDiv.appendChild(pCard);
      cardsContainerDiv.appendChild(cardDiv);

      //importamos weatherRender, y lo añadimos al contenedor de las cards

      let beachId = beach.id;

      //creo variable con valor true o false para cambiar contenido de weatherDiv
      let isWeatherSelected = false;

      let weatherDiv = document.createElement("div");
      weatherDiv.innerHTML = `<p>Mostrar tiempo</p>`;

      cardDiv.appendChild(weatherDiv);
      //Creamos un ad event listener cuya función será mostrar u ocultar el tiempo a través de un click en el div weatherDiv
      weatherDiv.addEventListener("click", async () => {
        if (!isWeatherSelected) {
          isWeatherSelected = true;
          // Limpia el contenido de weatherDiv antes de agregar el nuevo contenido
          weatherDiv.innerHTML = "";
          // Agrega directamente el contenido obtenido de weatherRender para cada playa
          let weatherContent = await weatherRender(beachId);
          weatherDiv.appendChild(weatherContent);
        } else {
          isWeatherSelected = false;
          weatherDiv.innerHTML = "<p>Mostrar tiempo</p>";
        }
      });
    } //AQUI ACABA EL FOR OF

    //! Introducimos el renderizado del index
    //indexDiv se ha declarado de forma global
    indexDiv = indexRender(userArray);
    main.appendChild(indexDiv);

    //seleccionamos todos los li y obtenemos el value del li seleccionado
    let indexLi = document.querySelectorAll(".indexLi");
    indexLi.forEach((e) => {
      e.addEventListener("click", (a) => {
        cardsContainerDiv.innerText = "";
        indexDiv.innerText = "";
        let selectedIndex = a.currentTarget.value;
        renderMain(userArray, selectedIndex);
      });
    });
  }

  // Cuando se aprieta el boton , hacemos que desaparezca el propio boton y cargue un nuevo div, que será el contenedor de las cartas

  mainButton.addEventListener("click", () => {
    mainButton.style.display = "none";
    searchForm.append(searchInput, searchButton);
    searchDiv.append(searchForm);
    header.prepend(searchDiv);

    main.appendChild(cardsContainerDiv);

    renderMain(beachArray);
  });
  //listener del boton de buscar, se hace un prevent default para evitar un submit y que recargue la pagina
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
      cardsContainerDiv.innerHTML = "";
      indexDiv.innerHTML = "";
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
      indexDiv.innerHTML = "";
      renderMain(filtered);
    }
  });
};
main();
