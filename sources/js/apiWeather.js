import { API_KEY } from "./privateKeys.js";

let apiWeather = async (beachNumber) => {
  try {
    let apiKey = API_KEY;

    let url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${beachNumber}?api_key=${apiKey}`;

    // console.log(url)

    let fetchApiWeather = await fetch(url);

    //Me aseguro de que se realice la conexión correctamente
    if (!fetchApiWeather.ok) {
      throw new Error(`Error HTTP: ${fetchApiWeather.status}`);
    }
    //Me aseguro de que haya obtenido correctamente un JSON
    let datajson = await fetchApiWeather.json();
    if (!datajson.datos) {
      throw new Error("La URL de los datos de la playa no está disponible.");
    }
    // Se va a realizar otro fetch necesario para obtener el json deseado
    let beachUrl = datajson.datos;
    let fetchBeach = await fetch(beachUrl);

    //Me aseguro de que se realice la conexión correctamente
    if (!fetchBeach.ok) {
      throw new Error(`Error HTTP: ${fetchBeach.status}`);
    }

    let dataBeachJson = await fetchBeach.json();

    return dataBeachJson;
  } catch (e) {
    console.error(`Ha habido un error:`, e);
  }
};

export { apiWeather };
