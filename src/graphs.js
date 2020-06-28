export const lineGraphFromAPI = (elemId, apiUrl) => {
    const ctx = document.getElementById(elemId);
    new Chart(ctx, {
        type: 'line'
    });
}

export const plotDygraphTimeSeriesFromData = ({elemId, data, xColName, yCols}) => {
    const graphRows = data.map(
        row => [new Date(row[xColName]), ...yCols.map(yCol=> row[yCol])]
    );
    const labels = [xColName, ...yCols];

    return new Dygraph(
        document.getElementById(elemId),
        graphRows, {
            labels: labels,
            showRangeSelector: true
        }
    );

}