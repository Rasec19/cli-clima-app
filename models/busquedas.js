const axios = require('axios');


class Busquedas {

    historial = [];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1IjoibXJyYXNlYzE5IiwiYSI6ImNsOWhteWd1cDAxbmwzdmp6MGFwODF1YnUifQ.B-xgNgWBeQcletXt1SCtGA',
            'limit': 5,
            'language': 'es'
        };
    }

    async ciudad( lugar = '' ) {

        try {
            //* peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            console.log(resp.data);

        } catch(err) {
            return [];
        }
    }

}





module.exports = Busquedas;