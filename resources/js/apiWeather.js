import { API_KEY } from "./privateKeys.js";

let apiWeather = async (beachId) => {
  try {

    //declaramos variable con el valor de la key que nos pide la api
    let apiKey = API_KEY;

    //declaramos variable con el valor de la url de la api, con 2 argumentos:
    //beachid-> Argumento pasado en la funcion con el id requerido
    //apiKey-> el valor de la key que pide la api

    let url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${beachId}?api_key=${apiKey}`;

//declaramos variable cuyo valor es el fetch de la url
    let fetchApiWeather = await fetch(url);

    //Me aseguro de que se realice la conexión correctamente, si no lanzo error
    if (!fetchApiWeather.ok) {
      throw new Error(`Error HTTP: ${fetchApiWeather.status}`);
    }
    //Me aseguro de que haya obtenido correctamente un JSON, si no lanzo error
    let datajson = await fetchApiWeather.json();
    if (!datajson.datos) {
      throw new Error("La URL de los datos de la playa no está disponible.");
    }

    // Se va a realizar otro fetch necesario para obtener el json deseado
    let beachUrl = datajson.datos;
    let fetchBeach = await fetch(beachUrl);

    //Me aseguro de que se realice la conexión correctamente, si no lanzo error
    if (!fetchBeach.ok) {
      throw new Error(`Error HTTP: ${fetchBeach.status}`);
    }
//declaro variable con el valor del json obtenido y retorno su valor
    let dataBeachJson = await fetchBeach.json();

    return dataBeachJson;
  } catch (e) {
    console.error(`Ha habido un error:`, e);
  }
};

export { apiWeather };
