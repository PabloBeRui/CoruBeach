const beachArray = [
  { beachName: "Riazor", photo: 1 },
  { beachName: "Riazor2", photo: 2 },
  { beachName: "Riazor3", photo: 3 },
  { beachName: "Riazor4", photo: 4 },
];
let mainButton = document.getElementById("mainButton");

let main = document.getElementById("main");
let cardsContainerDiv = document.createElement("div");
cardsContainerDiv.setAttribute("id", "cardsContainerDiv");

mainButton.addEventListener("click", () => {
  mainButton.style.display = "none";
  main.appendChild(cardsContainerDiv);

    for (let beach of beachArray) {
      

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("cardDiv");

    let imgCard = document.createElement("img");
    imgCard.classList.add("imgCard");
    imgCard.setAttribute("src", `../img/beaches/${beach.photo}.jpeg`);

    let pCard = document.createElement("p");
    pCard.classList.add("pCard");
        pCard.innerText = `${beach.beachName}`;
        
        

    console.log(imgCard);
      console.log(pCard);
      
      cardDiv.appendChild(imgCard)  
        cardDiv.appendChild(pCard)  
        cardsContainerDiv.appendChild(cardDiv)
      

    //   console.log(beach)

    //   cardDiv.appendChild()
  }
});
