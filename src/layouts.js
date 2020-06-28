import { getResponseJson } from './utils/index.js';
import { initializeTabulatorFromResponse } from './utils/index.js';

export const setupStandardLayout = (apiUrl, tableId) => new Promise((resolve, reject)=>{
    getResponseJson(apiUrl)
    .then(response => {
        console.log("Received response ", response);
        document.getElementById("table-and-charts").style.display = "block";
        document.getElementById("table-and-charts-loader").style.display = "none";
        if(tableId){
            initializeTabulatorFromResponse({tableId, response});
        }
        resolve(response);
    })
    .catch(error => {
        console.log("Caught error in setupStandardLayout as ", error);
        document.getElementById("table-and-charts-failure").style.display = "block";
        document.getElementById("table-and-charts-loader").style.display = "none";
    })
});
