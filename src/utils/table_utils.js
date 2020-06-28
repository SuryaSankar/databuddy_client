export function initializeTable(tableId, apiUrl){
    console.log("initializeTable started", tableId, apiUrl);
    var table = new Tabulator(
        "#" + tableId, {
            ajaxURL: apiUrl,
            autoColumns: true,
            pagination: "remote",
            paginationDataReceived: {
                "last_page": "total_pages"
            }
    });
}

export const cellFormatters = {
    currencies: {
        INR: {
            formatter: "money",
            formatterParams: {
                symbol: "₹"
            }
        },
        USD: {
            formatter: "money",
            formatterParams: {
                symbol: "$"
            }
        },       
    }
}

export function initializeTabulatorFromResponse({tableId, response, colsParams=null}){
    console.log("in initalizeTabulatr columns ", colsParams);
    const tableMetaInfoId = `${tableId}_meta`;
    document.getElementById(tableMetaInfoId).innerHTML = `Total items: ${response.total_items}`;
    let options = {
            data: response.data,
            pagination: "local",
            paginationSize: 20
    };
    if(colsParams){
        options.columns = response.columns.map(col=> {
            console.log("checking col ", col);
            const colDefinition = {field: col, title: col};
            const colParams = colsParams[col];
            if(colParams){
                console.log("colParams is", colParams);
                if(colParams.title){
                    colDefinition.title = colParams.title;
                }
                if(colParams.formatter){
                    colDefinition.formatter = colParams.formatter;
                }
                if(colParams.formatterParams){
                    colDefinition.formatterParams = colParams.formatterParams;
                }
            }
            return colDefinition;
        });
    }
    else{
        options.autoColumns = true;
    }
    return new Tabulator("#" + tableId, options);
}

