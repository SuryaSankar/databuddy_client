import { safeGet } from './collection_utils.js';


export function convertQueryStringToObject(queryString){
    if(queryString.startsWith("?")){
        queryString = queryString.slice(1);
    }
    if(queryString===""){
        return {};
    }
    return queryString
    .split("&")
    .reduce(function(result, entry){
        let parts=entry.split("="); 
        result[parts[0]] = parts[1]; 
        return result;
    }, {});
}

export function convertObjectToQueryString(obj){
    return Object.entries(obj)
        .map(
            function(entry){return entry[0] + "=" + entry[1]}
            )
        .join("&");
}

export function fetchQueryParamValue(queryString, param){
    const paramVals = convertQueryStringToObject(queryString);
    console.log("paramVals is ", paramVals, param);
    return safeGet(paramVals, param);
}

export function fetchJSONParamValueFromWindowLocation(jsonQueryParam, paramKey){
    const queryParamVal = fetchQueryParamValueFromWindowLocation(jsonQueryParam);
    if(!queryParamVal){
        return null;
    }
    return safeGet(
        JSON.parse(
            decodeURIComponent(
                queryParamVal
            )
        ),
        paramKey
    )
}

export function fetchQueryParamValueFromWindowLocation(param){
    return fetchQueryParamValue(window.location.search, param)
}

export function setUniqueParamsOnQueryString(queryString, params){
    const currParams = convertQueryStringToObject(queryString);
    let query = convertObjectToQueryString({...currParams, ...params});
    return query;
}

export function appendParamsToQueryString(queryString, params){
    console.log("In setParamsOnQueryString");
    if(!queryString.startsWith("?")){
        queryString = "?" + queryString;
    }
    if(params){
        if(queryString!="?"){
            queryString += "&";
        }
        queryString += convertObjectToQueryString(params);
        console.log(queryString);
    }
    return queryString
}

export function setUniqueParamsOnUrlObj(urlObj, params){
    if(!params){
        //cloning the url so that the result object will be consistently a new object always.
        return new URL(urlObj.href);
    }
    const queryString = setUniqueParamsOnQueryString(urlObj.search, params);
    let finalUrl = urlObj.origin + urlObj.pathname;

    if(queryString && queryString!==""){
        finalUrl += "?" + queryString;
    }
    return new URL(finalUrl);
}

export function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }
  return true;
}


export function setUniqueParamsOnUrl(url, params){
    console.log("in setUniqueParamsOnUrl with ", url, params);
    if(!params){
        return url;
    }
    const urlObj = url.startsWith("/") ? new URL("http://example.com" + url) : new URL(url);
    const modifiedUrlObj = setUniqueParamsOnUrlObj(urlObj, params);
    if(url.startsWith("/")){
        return modifiedUrlObj.pathname + modifiedUrlObj.search;
    }
    
    return modifiedUrlObj.href;
}


export function reloadPageWithExtraParams(params){
    // const queryString = setUniqueParamsOnQueryString(window.location.search, params);
    // let newLoc = window.location.origin + window.location.pathname;
    // if(queryString && queryString!==""){
    //     newLoc += "?" + queryString;
    // }
    // window.location.href = newLoc;
    window.location.href = setUniqueParamsOnUrlObj(window.location, params).href;
}