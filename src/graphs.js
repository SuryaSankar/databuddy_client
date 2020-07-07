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

export const plotlyPieChart = ({
        elemId, responseRows, valueGetter, labelGetter,
        layout={height: 600, width: 600}
    }) => {
    const values = responseRows.map(
        row => typeof valueGetter==="function" ? valueGetter(row) : row[valueGetter]
    );
    const labels = responseRows.map(
        row => typeof labelGetter==="function" ? labelGetter(row) : row[labelGetter]
    );
    console.log(values, labels);
    Plotly.newPlot(elemId, [{values, labels, type: 'pie'}], layout)
}