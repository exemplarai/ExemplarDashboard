import axios from 'axios';
export function getPayments(fromDate = '2017-10-15',toDate = '2017-10-21'){
    return axios.get('https://api.exemplar.ai/analytics/FM9W3RHMJFQ5M/payments.general?from='+fromDate+'&to='+toDate+'&offset=-08%3A00',{headers:getAuthorizationHeader()});
}

export function getMusicBaseline(fromDate = '2017-10-31',toDate = '2017-10-31'){
    return axios.get('https://api.exemplar.ai/analytics/summitPA4/tracks.spider?from='+fromDate+'&to='+toDate+'&break=14%3A00%3A00&offset=-08%3A00', {headers:getAuthorizationHeader()});
}

export function getFeatures(fromDate = '2017-10-01',toDate = '2017-10-31'){
    return axios.get('https://api.exemplar.ai/analytics/FM9W3RHMJFQ5M/tracks.features?from='+fromDate+'&to='+toDate+'&offset=-08%3A00', {headers:getAuthorizationHeader()});
}

export function getRecentTracks(){
    return axios.get('https://api.exemplar.ai/analytics/summitPA1/tracks.recent?limit=4', {headers:getAuthorizationHeader()});
}

export function getCorelationSales(){
    return axios.get('https://api.exemplar.ai/analytics/Jesus/correlations.sales', {headers:getAuthorizationHeader()});
}

export function getCorelationPrice(){
    return axios.get('https://api.exemplar.ai/analytics/Jesus/correlations.price', {headers:getAuthorizationHeader()});
}

function  getAuthorizationHeader(){
    return {'Authorization': `Bearer ${localStorage.getItem('access_token')}`};
};
