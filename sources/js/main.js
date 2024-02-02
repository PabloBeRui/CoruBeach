import { weatherRender } from "./render/weatherRender.js";

export const main = () => {
  const beachArray = [
    { beachName: "Riazor", photo: 1, id: "1503005" },
    { beachName: "Orzan", photo: 2, id: "1503005" },
    { beachName: "Boa grande", photo: 3, id: "1505701" },
    { beachName: "Caion", photo: 4, id: "1504101" },
  ];
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

  searchInput.placeholder = "busca tu playa";
  searchInput.id = "searchInput";

  //! función que renderiza las cards
  async function renderMain(userArray) {
    for (let beach of userArray) {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("cardDiv");

      let imgCard = document.createElement("img");
      imgCard.classList.add("imgCard");
      imgCard.setAttribute("src", `./sources/img/beaches/${beach.photo}.jpeg`);

      let pCard = document.createElement("p");
      pCard.classList.add("pCard");
      pCard.innerText = `${beach.beachName}`;

      cardDiv.appendChild(imgCard);
      cardDiv.appendChild(pCard);
      cardsContainerDiv.appendChild(cardDiv);

      //importamos weatherRender, y lo añadimos al contenedor de las cards
      let beachId = beach.id;

      const weatherDiv = await weatherRender(beachId);

      cardsContainerDiv.appendChild(weatherDiv);
    }
  }
  //! Cuando se aprieta el boton , hacemos que desaparezca el boton y cargue un nuevo div, que será el contenedor de las cartas

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
      //!Filtramos el array con el valor que nos pasa el usuario en el input y hacemos un nuevo renderizado con el array filtrado
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
