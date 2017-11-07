import axios from 'axios';
export function getPayments(){
    return axios.get('https://api.exemplar.ai/analytics/FM9W3RHMJFQ5M/payments.general?from=2017-10-18&to=2017-10-25&offset=-08%3A00',{headers:getAuthorizationHeader()});
}

export function getMusicBaseline(){
    return axios.get('https://api.exemplar.ai/analytics/summitPA4/tracks.spider?from=2017-10-01&to=2017-10-31&break=14%3A00%3A00&offset=-08%3A00', {headers:getAuthorizationHeader()});
}

export function getFeatures(){
    return axios.get('https://api.exemplar.ai/analytics/FM9W3RHMJFQ5M/tracks.features?from=2017-10-01&to=2017-10-31&offset=-08%3A00', {headers:getAuthorizationHeader()});
}

export function getRecentTracks(){
    return axios.get('https://api.exemplar.ai/analytics/summitPA1/tracks.recent?limit=4', {headers:getAuthorizationHeader()});
}

function  getAuthorizationHeader(){
    return {'Authorization': `Bearer ${localStorage.getItem('access_token')}`};
};
