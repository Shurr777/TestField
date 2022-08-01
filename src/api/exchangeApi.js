//CURRENCY_EXCHANGE API....................................
import * as axios from "axios";

const exchangeInstance = axios.create({
    withCredentials: false,
    baseURL: "https://cdn.cur.su/api/nbu.json"
});

export const CurrencyExchangeAPI = {
    /* getCountries() {
         return apiInstance.get().then(response => response.data)
     },*/
    getCourse() {
        return exchangeInstance.get().then(response => response.data)
    },
};