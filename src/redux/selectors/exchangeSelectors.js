export const getCourses = (state) =>{
    return state.exchangePage.courses
};
export const getEUR = (state) =>{
    return state.exchangePage.EUR[0][1]
};
export const getUSD = (state) =>{
    return state.exchangePage.USD[0][1]
};
export const getUAH = (state) =>{
    return state.exchangePage.UAH[0][1]
};