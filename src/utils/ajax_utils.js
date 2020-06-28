import { setUniqueParamsOnUrl } from './url_utils.js';

export const getResponseJson = (url, queryParams) => {
    const modUrl = queryParams ? setUniqueParamsOnUrl(url, queryParams) : url;
    return fetch(modUrl)
    .then(response=> response.json());
}