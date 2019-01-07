"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent = require("superagent");
const ENPOINT = "https://api.sncf.com/v1/coverage/fr-idf";
const TOKEN_KEY = "88ebd821-f0c3-4492-aefa-26d10267f0d1";
const headers = { Authorization: TOKEN_KEY };
const handleResponse = (resp) => {
    if (!resp.ok) {
        throw Error(`${resp.status}`);
    }
    return resp.body;
};
exports.getPossibleItems = (partialValue) => {
    return superagent
        .get(`${ENPOINT}/places?q=${partialValue}&type[]=stop_area&disable_geojson=true`)
        .set(headers)
        .then(handleResponse)
        .then(items => items.places.map(p => p.stop_area));
};
exports.getNextDepartures = (stop_area_id) => {
    const forbiddenUris = "forbidden_uris[]=" +
        ["physical_mode:Bus", "physical_mode:Metro"].join("&forbidden_uris[]=");
    return superagent
        .get(`${ENPOINT}/stop_areas/${stop_area_id}/departures?data_freshness=realtime&disable_geojson=true&${forbiddenUris}`)
        .set(headers)
        .then(handleResponse)
        .then(resp => {
        return resp.departures;
    });
};
exports.getStopAreaInfo = (stop_area_id) => {
    return superagent
        .get(`${ENPOINT}/stop_areas/${stop_area_id}`)
        .set(headers)
        .then(handleResponse)
        .then(resp => resp.stop_areas[0]);
};
