const axios = require('axios');


class Busquedas {

    historial = [];

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }
    
    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
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
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch(err) {
            return [];
        }
    }

    async climaLugar( lat, lon ) {

        try {

            //todo: instance axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }`,
                params: this.paramsWeather
            });

            //* resp.data
            const resp = await instance.get();
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            };

        } catch(e) {
            console.log(e)
        }

    }

}





module.exports = Busquedas;