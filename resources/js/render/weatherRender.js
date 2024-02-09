// Creamos las variables  con los valores que necesitamos del json para renderizar.  creamos el div que englobe los componentes de la API del tiempo , creamos los componentes que iran dentro y despues lo añadimos al contenedor de cada carta.

import { apiWeather } from "../apiWeather.js";

export const weatherRender = async (beachId) => {
  try {
    //crea variable para cada playa con los datos obtenidos del json retornado por apiWeather
    const apiWeatherJson = await apiWeather(beachId);

//Comprobamos que existan los datos requeridos, si no lanzamos error
    if (!apiWeatherJson || !apiWeatherJson[0].prediccion.dia[0]) {
      throw new Error("Datos meteorológicos incompletos o no disponibles.");
    }

    // Creamos las variables que con los valores que necesitamos del json para renderizar

    const degrees = apiWeatherJson[0].prediccion.dia[0].tMaxima.valor1;
    const sky = apiWeatherJson[0].prediccion.dia[0].estadoCielo.descripcion1;
    const wind = apiWeatherJson[0].prediccion.dia[0].viento.descripcion1;
    const wave = apiWeatherJson[0].prediccion.dia[0].oleaje.descripcion1;

    // //TODO manejo de errores si no llega algun dato especifico 
    // if (!degrees || !sky || !wind || !wave) {
    //   throw new Error("");
    // }

    //   creamos el div que englobe los componentes de la API del tiempo , creamos los componentes que iran dentro y despues lo añadimos al contenedor de cada carta.

    let weatherDiv = document.createElement("div");
    weatherDiv.innerHTML = `
  <ul>
  <li id="degrees" class="weatherItemLi">Temperatura: ${degrees}</li>
  <li id="sky" class="weatherItemLi">Cielo: ${sky}</li>
  <li id="wind" class="weatherItemLi">Viento: ${wind} </li>
  <li id="wave" class="weatherItemLi">Oleaje: ${wave}</li>
  </ul>
    
    
    `;

    return weatherDiv;
  } catch (e) {
    console.error("Ha habido un error:", e);
  }
};
