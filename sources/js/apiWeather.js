import { API_KEY } from "./privateKeys.js";

let apiWeather = async () => {
  let apiKey = API_KEY;

  let url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/1503005?api_key=${apiKey}`;

  // console.log(url)

  let fetchApiWeather = await fetch(url);

  let datajson = await fetchApiWeather.json();

  let beachUrl = datajson.datos;

  let fetchBeach = await fetch(beachUrl);
  let dataBeachJson = await fetchBeach.json();
  // console.log(dataBeachJson[0].prediccion)

  //   console.log(fetchApiWeather);
  // console.log(datajson);

  return dataBeachJson;
};

export { apiWeather };
