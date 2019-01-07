import * as superagent from "superagent";

const ENPOINT = "https://api.sncf.com/v1/coverage/fr-idf";
const TOKEN_KEY = "88ebd821-f0c3-4492-aefa-26d10267f0d1";
const headers = { Authorization: TOKEN_KEY };

const handleResponse = (resp: superagent.Response): any => {
  if (!resp.ok) {
    throw Error(`${resp.status}`);
  }
  return resp.body;
};

interface IMode {
  id: string;
  name: string;
}

interface ICoord {
  lat: string;
  lon: string;
}

interface ICode {
  type: string;
  value: string;
}

interface IAdministrativeRegion {
  insee: string;
  name: string;
  level: 8;
  coord: { lat: string; lon: string };
  label: string;
  id: string;
  zip_code: string;
}

export interface IResult {
  comment: string;
  commercial_modes: IMode[];
  name: string;
  physical_modes: IMode[];
  coord: ICoord;
  label: string;
  codes: ICode[];
  administrative_regions: IAdministrativeRegion[];
  timezone: string;
  id: string;
}

export const getPossibleItems = (partialValue: string): Promise<IResult[]> => {
  return superagent
    .get(
      `${ENPOINT}/places?q=${partialValue}&type[]=stop_area&disable_geojson=true`
    )
    .set(headers)
    .then(handleResponse)
    .then(items => items.places.map(p => p.stop_area));
};

export const getNextDepartures = (stop_area_id: string): Promise<any> => {
  const forbiddenUris =
    "forbidden_uris[]=" +
    ["physical_mode:Bus", "physical_mode:Metro"].join("&forbidden_uris[]=");

  return superagent
    .get(
      `${ENPOINT}/stop_areas/${stop_area_id}/departures?data_freshness=realtime&disable_geojson=true&${forbiddenUris}`
    )
    .set(headers)
    .then(handleResponse)
    .then(resp => {
      return resp.departures;
    });
};

export const getStopAreaInfo = (stop_area_id: string): Promise<any> => {
  return superagent
    .get(`${ENPOINT}/stop_areas/${stop_area_id}`)
    .set(headers)
    .then(handleResponse)
    .then(resp => resp.stop_areas[0]);
};
