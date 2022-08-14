import * as axios from "axios";

const SWAPI_ROOT = 'https://swapi.dev/api/';
/*const SWAPI_PEOPLE = 'people';*/

const starwarInstance = axios.create({
    baseURL: SWAPI_ROOT
});

export const starwarAPI = {
    getResources() {
        return starwarInstance.get()
            .then(response => response.data)
            .catch(error => console.log(error.message))
    },
    getPage(link) {
        //  console.log('api link', link);
        return starwarInstance.get(`${link}/`)
            .then(response => response.data)
            .catch(error => console.log(error.message))
    },
    getNewPage(url){
       return axios.get(url)
           .then(response => response.data)
    }
};