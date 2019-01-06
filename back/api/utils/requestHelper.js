"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonBody = (request) => {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", () => {
            try {
                const jsonBody = JSON.parse(body);
                resolve(jsonBody);
            }
            catch (error) {
                reject(error);
            }
        });
        request.on("error", err => {
            reject(err);
        });
    });
};
