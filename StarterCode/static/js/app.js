var menuValue = d3.select("selDataset")

d3.json("samples.json").then(function(data){
    
    //var dataset = menuSelection.property("value");
    var names = data.names;
    names.forEach((name, i) => {
        var menuSelection = menuValue.append("option");
        menuSelection.text(name);
        menuSelection.attr("value",`${i}`)});
});
function OpeningBar() {
    d3.json("samples.json").then(function(data){
        var sample_values = data.samples.map(x => x.sample_values);
        var otu_id = data.samples.map(x => x.otu_ids);
        var otu_labels = data.samples.map(x => x.otu_labels);
        
        // Getting 10 results for the individual
        //sampleValues = Object.values(sample_Values);
        var tenValues = sample_values[0].slice(0,10);
        console.log(tenValues);
        var reversedValues = tenValues.reverse();
        console.log(reversedValues);

        var tenSamples = otu_id[0].slice(0,10);
        var reversedSamples = tenSamples.reverse();
        var xlabels = reversedSamples.map(x => `OTU ${x}`);
        console.log(xlabels);

        var tenLabels = otu_labels[0].slice(0,10);
        var reversedLabels = tenLabels.reverse();
        console.log(reversedLabels);

        
        var trace = {
            x: reversedValues,
            y: xlabels,
            type: "bar",
            orientation: 'h',
            text: reversedLabels
        };

        traceData = [trace];

        var layout = {
            title: "Bar Chart - Frequency of Top 10 OTU's",
            xaxis: { title: "OTU Count"},
            yaxis: { title: "OTU ID"}
        };

        Plotly.newPlot("bar", traceData,layout)})};

OpeningBar();

function OpeningBubble()  {
    d3.json("samples.json").then(function(data){
        var sample_values = data.samples.map(x => x.sample_values);
        var otu_id = data.samples.map(x => x.otu_ids);
        var otu_labels = data.samples.map(x => x.otu_labels);
        
        var tenValues = sample_values[0];
        var xlabels = otu_id[0];
        var DataLabels = otu_labels[0];
        var colorValues = otu_id[0];
        
        var trace = {
            x: xlabels,
            y: tenValues,
            mode: 'markers',
            text: DataLabels,
            marker:{
            size: tenValues,
            color: colorValues
            }
        };

        traceData = [trace];

        var layout = {
            title: "Bubble Chart - Frequency of Top 10 OTU's",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "OTU Count"}
        };

        Plotly.newPlot("bubble", traceData,layout)})};
    
OpeningBubble();

function OpeningDemog () {
    d3.json("samples.json").then(function(data) {
        var sampleSelection = data.metadata[0];
        
        addList.html("");

        Object.entries(sampleSelection).forEach(([key, value]) => {
            var addItem = addList.append("li");
            addItem.text(`${key}: ${value}`);
        });

    });
};

OpeningDemog();

var menuSelection = menuValue.property("value");

function CreateBar() {
    d3.json("samples.json").then(function(data){
        var menuSelection = menuValue.property("value");
        var selectionIndex = parseInt(menuSelection);
        var sampleSelection = data.samples[selectionIndex];
        
        var sample_values = sampleSelection.map(x => x.sample_values);
        var otu_id = sampleSelection.map(x => x.otu_ids);
        var otu_labels = sampleSelection.map(x => x.otu_labels);
        
        // Getting 10 results for the individual
        //sampleValues = Object.values(sample_Values);
        var tenValues = sample_values[0].slice(0,10);
        console.log(tenValues);
        var reversedValues = tenValues.reverse();
        console.log(reversedValues);

        var tenSamples = otu_id[0].slice(0,10);
        var reversedSamples = tenSamples.reverse();
        var xlabels = reversedSamples.map(x => `OTU ${x}`);
        console.log(xlabels);

        var tenLabels = otu_labels[0].slice(0,10);
        var reversedLabels = tenLabels.reverse();
        console.log(reversedLabels);

        
        var trace = {
            x: reversedValues,
            y: xlabels,
            type: "bar",
            orientation: 'h',
            text: reversedLabels
        };

        traceData = [trace];

        var layout = {
            title: "Bar Chart - Frequency of Top 10 OTU's",
            xaxis: { title: "OTU Count"},
            yaxis: { title: "OTU ID"}
        };

        Plotly.newPlot("bar", traceData,layout)
    });
};

function CreateBubble()  {
    d3.json("samples.json").then(function(data){
        var menuSelection = menuValue.property("value");
        var selectionIndex = parseInt(menuSelection);
        var sampleSelection = data.samples[selectionIndex];
        var sample_values = sampleSelection.map(x => x.sample_values);
        var otu_id = sampleSelection.map(x => x.otu_ids);
        var otu_labels = sampleSelection.map(x => x.otu_labels);
        
        var tenValues = sample_values[0];
        var xlabels = otu_id[0];
        var DataLabels = otu_labels[0];
        var colorValues = otu_id[0];
        
        var trace = {
            x: xlabels,
            y: tenValues,
            mode: 'markers',
            text: DataLabels,
            marker:{
            size: tenValues,
            color: colorValues
            }
        };

        traceData = [trace];

        var layout = {
            title: "Bubble Chart - Frequency of Top 10 OTU's",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "OTU Count"}
        };

        Plotly.newPlot("bubble", traceData,layout)})};


var panelArea = d3.select("#sample-metadata");
var addList = panelArea.append("ul").attr("class", "list-unstyled");


function CreateDemog () {
    d3.json("samples.json").then(function(data) {

        var userSelection = menuSelection.property("value");

        var selectionIndex = parseInt(userSelection);

        var sampleSelection = data.metadata[selectionIndex];

        addList.html("");

        Object.entries(sampleSelection).forEach(([key, value]) => {

            var addItem = addList.append("li");

            addItem.text(`${key}: ${value}`);
        });

        // console.log(sampleSelection);

    });
};



function UpdateCharts() {
    CreateBar();
    CreateBubble();
    buildPanel()
};   
        
d3.selectAll("#selDataset").on("change", UpdateCharts);

