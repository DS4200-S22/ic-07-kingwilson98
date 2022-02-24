/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
//Finds the element on our page via select then adds an SVG and then just sets width and height
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
//Looks at the score column in data1 and pulls out the maximum
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do? 
//Sets up the y-axis scale that takes us data values to pixel values  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
//Sets up the x-axis scale that takes us from data values to pixel values
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
//This adds the an y axis by appending a generic svg and they translate into the spot we want and then get y-axis a scale.
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? ]
//This adds the an x axis by appending a generic svg and they translate into the spot we want and then get x-axis a scale.
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// selecting hard-coded bar and appending this div made in index.html.  Then it gives it 0 opacity.
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
//When the mouse goes over a certain bar it shows the name and score of the bar that the user is hovering over.  
//Also changes the opacity from 0 to 1
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
//Set the position to be equal to event x and event y.
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
//Sets the opacity to 0, so that the user cannot see the visuals anymore
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
//Selects anything with the class bar
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);








