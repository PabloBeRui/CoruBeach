export const main = () => {
  const beachArray = [
    { beachName: "Riazor", photo: 1 },
    { beachName: "Orzan", photo: 2 },
    { beachName: "Lapas", photo: 3 },
    { beachName: "Caion", photo: 4 },
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

  //! Cuando se aprieta el boton , hacemos que desaparezca el boton y cargue un nuevo div, que será el contenedor de las cartas

  mainButton.addEventListener("click", () => {
    mainButton.style.display = "none";
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    main.appendChild(searchDiv);

    main.appendChild(cardsContainerDiv);

    renderMain(beachArray);
  });

  searchButton.addEventListener("click", () => {
    if (searchInput.value === "") {
      return;
    } else {
      //!Filtramos el array con el valor que nos pasa el usuario en el input y hacemos un nuevo renderizado con el array filtrado
      let pattern = searchInput.value.toLowerCase();
      let filtered = beachArray.filter((beach) =>
      beach.beachName.toLowerCase().includes(pattern));
      
      if(filtered.length === 0){
        alert("No se ha encontrado ningún resultado");
        return;
      }
      cardsContainerDiv.innerHTML = '';
      renderMain(filtered);
    }
  });

  function renderMain(userArray) {
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
    }
  }
};
