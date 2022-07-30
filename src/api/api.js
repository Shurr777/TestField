import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "3c9e8063-2bb0-4fcf-8869-c0912138418d"}
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    follow(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },

    unfollow(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },

    authorization() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email, password, rememberMe = false, captcha = null ) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    },

};

export const profileAPI = {
    getProfile(id) {
        return instance.get(`/profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`/profile/status/${id}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`/profile/status/`, {status: status}).then(response => response.data)
    },
    savePhoto(file){
        let formData = new FormData();
        formData.append('image', file);
        return instance.put(`/profile/photo`, formData, {
            headers:{"Content-Type": 'multipart/form-data'}
        }).then(response => response.data)
    },
    saveProfile(profile){
      return instance.put(`profile`, profile).then(response => response.data)
    }
};

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`)
    }
};


//STARWAR API.............................................
const starwarInstance = axios.create({
    baseURL: 'https://swapi.dev/api/'
});

export const starwarAPI = {
    getResources() {
        return starwarInstance.get().then(response => response.data)
    },
    getPages(link){
        console.log('api link', link)
        return starwarInstance.get(`${link}/`).then(response => response.data);
    }
};


//CURRENCY_EXCHANGE API....................................
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
