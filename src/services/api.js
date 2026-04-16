import axios from 'axios'

const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
})

export const getAllCountries = () => {
    return api.get('/all');
};

export const getCountriesByName = (name) => {
    return api.get(`/name/${name}`);
};

export const getCountriesByRegion = (region) => {
    return api.get(`/region/${region}`);
};

export const getCountryByCode = (code) => {
    return api.get(`/alpha/${code}`);
};

export default api