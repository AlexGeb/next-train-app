import * as superagent from 'superagent';

const ENPOINT = 'https://api.sncf.com/v1/coverage/fr-idf';
const TOKEN_KEY = '88ebd821-f0c3-4492-aefa-26d10267f0d1';
const headers = { Authorization: TOKEN_KEY };

const handleResponse = (resp: superagent.Response): any => {
  if (!resp.ok) {
    throw Error(`${resp.status}`);
  }
  return resp.body;
};

interface IResult {
  id: string;
  name: string;
}

export const getPossibleItems = (partialValue: string): Promise<IResult[]> => {
  return superagent
    .get(
      `${ENPOINT}/places?q=${partialValue}&type[]=stop_area&disable_geojson=true`
    )
    .set(headers)
    .then(handleResponse)
    .then(items => items.places.map(p => ({ id: p.id, name: p.name })));
};

export const getNextDepartures = (stopAreaId: string): Promise<any> => {
  const forbiddenUris = `forbidden_uris[]=${[
    'physical_mode:Bus',
    'physical_mode:Metro'
  ].join('&forbidden_uris[]=')}`;

  return superagent
    .get(
      `${ENPOINT}/stop_areas/${stopAreaId}/departures?data_freshness=realtime&disable_geojson=true`
    )
    .set(headers)
    .then(handleResponse)
    .then(resp =>
      resp.departures.map(depart => ({
        displayInformations: depart.display_informations,
        stopDateTime: {
          ...depart.stop_date_time,
          departureDateTime: depart.stop_date_time.departure_date_time
        }
      }))
    );
};

export const getStopAreaInfo = (stopAreaId: string): Promise<any> => {
  return superagent
    .get(`${ENPOINT}/stop_areas/${stopAreaId}`)
    .set(headers)
    .then(handleResponse)
    .then(resp => resp.stop_areas[0]);
};
