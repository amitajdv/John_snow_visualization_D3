window.onload = function(){
    showDeathGender();
    createGenderPieChart();
    createLineChart();
    giveStreetNames();
}

function getAgeGroup(ageGroup){
    if(ageGroup == 0){
        return "0-10";
    }if(ageGroup == 1){
        return "11-20";
    }if(ageGroup == 2){
        return "21-40";
    }if(ageGroup == 3){
        return "41-60";
    }if(ageGroup == 4){
        return "61-80";
    }if(ageGroup == 5){
        return ">80"
    }
}


d3.json('files/streets.json', function(json) 
{
    generateMapLines(json)
});


function generateMapLines(data){

    var selection = d3.select('svg')
        .select('g')
        .selectAll('polyline')
        .data(data)

    selection.enter()
        .append('polyline')
        .style("stroke", "black")
        .style("stroke-width", 1)
        .style('fill','none')
        .attr("points", function(d) {
            new_str = ""
            for(i=0;i<d.length; i++){
                new_str = new_str + ',' + -(200 - d[i]['x']*35) + ',' + (570 - d[i]['y']*35)
            }
            var new_substring = new_str.substring(1)
            return new_substring;
        });
        // 130,150

    d3.csv('files/pumps.csv', function(pumps){
        
        var node_pump = d3.select('svg')
        .select('g')
        .selectAll('img')
        .data(pumps)

        node_pump.enter()
        .append("svg:image")
        .attr('x', function(d) { return -(200 - (d.x)*35); })
        .attr('y', function(d) { return 570 - (d.y)*35; })
        .attr('width', 15)
        .attr('height', 15)
        .attr("xlink:href", "images/pump.png");
    });	
}

function showDeathGender(){

    removePreviousDots();
    createGenderLegend();
    createGenderPieChart();

    var tooltip = d3.select("body")
        .append("div")
        .attr("data-html", "true")
        .style("position", "absolute")
        .style("z-index", "10")
        .style('margin-bottom','100px')
        .style("visibility", "hidden")
        .style("background-color","#fce1c5")
        .style("padding","4px 4px")
        .style("border","1px solid #333");
        
    
    d3.csv('files/deaths_age_sex.csv', function(deaths_age_sex){

        deaths_age_sex.forEach(function(d){ 
            if(d['gender'] == '0'){
                d['gender'] = 'Male'
            }if(d['gender'] == '1'){
                d['gender'] = 'Female'
            }
        });

        var node_death = d3.select('svg')
        .select('g')
        .selectAll('dot')
        .data(deaths_age_sex)

        
        node_death.enter()
        .append("circle")
        .attr("cx", function(d) { return -(200 - (d.x)*35); } )
        .attr("cy", function(d) { return 570 - (d.y)*35; } )
        .attr("r", 3)
        // .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", function(d){
            if(d.gender == "Male"){
                return '#0341fc'; //blue
            }else if(d.gender == "Female"){
                return "#fc03c6"; //pink
            }
        })
        .on("mouseover", function(d){
            d3.select(this).attr("r", 8)
            text = tooltip.text('Gender:'+ d.gender + ' Age group: ' + getAgeGroup(d.age))
            style = tooltip.style("visibility", "visible");
            return text,style
        })
        .on("mousemove", function(){
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(){
            d3.select(this).attr("r", 3)
            return tooltip.style("visibility", "hidden");
        });
    });    
}

function createGenderLegend(){

    d3.select('#legends').select('#legends_g').append("text").attr("x", 190).attr("y", 70).text("Legend").style("font-size", "17px").style("font-weight", "bold").attr("alignment-baseline","middle")

    d3.select('#legends').select('#legends_g').append("svg:image").attr('x',190).attr("y",95).attr('width', 15).attr('height', 15).attr("xlink:href", "images/pump.png");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#fc03c6");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#0341fc")
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#f77474")
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "#b1ff4a")

    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 100).text("Pumps").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 130).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 160).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 190).text("Work House").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 220).text("Brewery").style("font-size", "15px").attr("alignment-baseline","middle")
    
    d3.select('#legends').select('#legends_g')
    .append('rect')
    .attr("x", 180)
      .attr("y", 50)
    .attr("width", 140)
    .attr("height", 190)
    .style("stroke", "black")
    .style("fill", "none");

}

function showDeathAge(){

    removePreviousDots();
    createAgeLegend();
    createAgePieChart();

    var tooltip = d3.select("body")
        .append("div")
        .attr("data-html", "true")
        .style("position", "absolute")
        .style("z-index", "10")
        .style('margin-bottom','100px')
        .style("visibility", "hidden")
        .style("background-color","#fce1c5")
        .style("padding","4px 4px")
        .style("border","1px solid #333");

    d3.csv('files/deaths_age_sex.csv', function(deaths_age_sex){
        
        deaths_age_sex.forEach(function(d){
            if(d['gender'] == '0'){
                d['gender'] = 'Male'
            }if(d['gender'] == '1'){
                d['gender'] = 'Female'
            }
            d['age'] = +d['age']; 
        });

        var node_death_age = d3.select('svg')
        .select('g')
        .selectAll('dot')
        .data(deaths_age_sex)
        
        node_death_age.enter()
        .append("circle")
        .attr("cx", function(d) { return -(200 - (d.x)*35); } )
        .attr("cy", function(d) { return 570 - (d.y)*35; } )
        .attr("r", 3)
        // .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", function(d){
            if (d.age == 0) {
                return '#fff133'; //yellow
            }if(d.age == 1){
                return '#50d627'; //green
            }if(d.age == 2){
                return '#ff9633'; // orange
            }if(d.age == 3){
                return '#2799db'; //skyblue
            }if(d.age == 4){
                return '#d227db'; // purple
            }if(d.age == 5){
                return '#1703ab'; // blue
            }
            
        })
        .on("mouseover", function(d){
            d3.select(this).attr("r", 8)
            text = tooltip.text('Gender:'+ d.gender + ' Age group:' + getAgeGroup(d.age))
            style = tooltip.style("visibility", "visible");
            return text,style
        })
        .on("mousemove", function(){
            return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(){
            d3.select(this).attr("r", 3)
            return tooltip.style("visibility", "hidden");
        });

    });
}

function createAgeLegend(){

    // #f77474, #b1ff4a

    d3.select('#legends').select('#legends_g').append("text").attr("x", 190).attr("y", 70).text("Legend: Age Group").style("font-size", "17px").style("font-weight", "bold").attr("alignment-baseline","middle")

    d3.select('#legends').select('#legends_g').append("svg:image").attr('x',190).attr("y",95).attr('width', 15).attr('height', 15).attr("xlink:href", "images/pump.png");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#fff133");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#50d627")
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#ff9633");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "#2799db");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",250).attr("r", 6).style("fill", "#d227db");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",280).attr("r", 6).style("fill", "#1703ab");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",310).attr("r", 6).style("fill", "#f77474");
    d3.select('#legends').select('#legends_g').append("circle").attr("cx",200).attr("cy",340).attr("r", 6).style("fill", "#b1ff4a");

    
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 100).text("Pumps").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 130).text("0-10").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 160).text("11-20").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 190).text("21-40").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 220).text("41-60").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 250).text("61-80").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 280).text("> 80").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 310).text("Work House").style("font-size", "15px").attr("alignment-baseline","middle")
    d3.select('#legends').select('#legends_g').append("text").attr("x", 220).attr("y", 340).text("Brewery").style("font-size", "15px").attr("alignment-baseline","middle")
    
    d3.select('#legends').select('#legends_g')
    .append('rect')
    .attr("x", 180)
      .attr("y", 50)
    .attr("width", 180)
    .attr("height", 310)
    .style("stroke", "black")
    .style("fill", "none");

}


function createGenderPieChart(){

    // .style("opacity", 0.7)

    var width = 250
    height = 400
    margin = 10

    var svg = d3.select("#bar_chart").select('#bar_chart_g');
    var total = 0

    var radius = Math.min(width, height) / 2 - margin

    d3.csv('files/deaths_age_sex.csv', function(deaths_age_sex){
        
        var data = {'Female':0,'Male':0}

        deaths_age_sex.forEach(function(d){
            if(d.gender == "0"){
                data['Male'] += 1; 
            }if(d.gender == "1"){
                data['Female'] += 1; 
            }
            total += 1;
            
        });

        
        var pie = d3.pie()
        .sort(null)
        .value(function(d) {return d.value; })

        var data_ready = pie(d3.entries(data));

        var arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

        var outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

        svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d){ 
            if(d.data.key == "Female"){
                return '#fc03c6'; //pink
            }if(d.data.key == "Male"){
                return '#0341fc'; //blue
            }	
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function(d) {
            var arc_big = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.9)
            d3.select(this).attr("d", arc_big)
            
        })
        .on("mouseout", function(d) {
            var arc_small = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.8)
            d3.select(this).attr("d", arc_small)
        })
        .on("click", function(d) {
            // ShowOneGender(d.data['key'])
        });

        svg
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
        })

        svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text( function(d) { return d.data.key + " (" + parseFloat((d.data.value/total)*100).toFixed(2) + "%)" } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        });

        svg.append('text')
        .attr("x", -120)
        .attr("y", -130)
        .text("Distribution of deaths by gender")
        .style("font-size", "17px")
        .attr("alignment-baseline","middle")
        .attr('text-decoration',"underline");
        
    });
}


function createAgePieChart(){

    var width = 250
    height = 400
    margin = 10

    var svg = d3.select("#bar_chart").select('#bar_chart_g');
   
    var total = 0

    var radius = Math.min(width, height) / 2 - margin

    d3.csv('files/deaths_age_sex.csv', function(deaths_age_sex){
        
        var data = {'0-10':0,'11-20':0,'21-40':0,'41-60':0,'61-80':0,'> 80':0}

        deaths_age_sex.forEach(function(d){
            if(d.age == "0"){
                data['0-10'] += 1; 
            }if(d.age == "1"){
                data['11-20'] += 1; 
            }if(d.age == "2"){
                data['21-40'] += 1; 
            }if(d.age == "3"){
                data['41-60'] += 1; 
            }if(d.age == "4"){
                data['61-80'] += 1; 
            }if(d.age == "5"){
                data['> 80'] += 1; 
            }
            total += 1;
            
        });

        
        var pie = d3.pie()
        .sort(null)
        .value(function(d) {return d.value; })

        var data_ready = pie(d3.entries(data));

        var arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)

        var outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

        svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d){ 
            if(d.data.key == "0-10"){
                return '#fff133'; 
            }if(d.data.key == "11-20"){
                return '#50d627'; 
            }if(d.data.key == "21-40"){
                return '#ff9633'; 
            }if(d.data.key == "41-60"){
                return '#2799db'; 
            }if(d.data.key == "61-80"){
                return '#d227db'; 
            }if(d.data.key == "> 80"){
                return '#1703ab';
            }
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function(d) {
            var arc_big = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius * 0.9)
            d3.select(this).attr("d", arc_big)
            
        })
        .on("mouseout", function(d) {
            var arc_small = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.8)
            d3.select(this).attr("d", arc_small)
        });


        svg
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
        })

        svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text( function(d) { return d.data.key + " (" + parseFloat((d.data.value/total)*100).toFixed(2) + "%)" } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        });

        svg.append('text')
        .attr("x", -120)
        .attr("y", -130)
        .text("Distribution of deaths by age")
        .style("font-size", "17px")
        .attr("alignment-baseline","middle")
        .attr('text-decoration',"underline");
        
    });
}


// function ShowOneGender(gender){
//     if(gender == "Male"){
//         var circles = d3.select('svg').select('g').selectAll("circle")['_groups']['0'];
        
//         var circles_array = []

//         for (let i = 0; i < circles.length; i++) {
//             console.log(circles[i])
//             circles_array.push(circles[i])
//         }

//         d3.select('svg').select('g').selectAll('circle')
//         .data(selected)
//         .attr("r", 6)
//         .attr("stroke",'#4f0559')
//         .attr("stroke-width",'3px');

//         console.log(circles_array)
//     }
// }


function createLineChart(){

    d3.csv('files/deathdays.csv', function(deathdays){

        var parseTime = d3.timeParse("%d-%b");
        // var formatDate = d3.timeFormat("%b %d");

        deathdays.forEach(function(d){
            d.dates_new = parseTime(d.date);
            // d.dates_new = formatDate(d.dates_new)
            d.deaths = +d.deaths; 
        });


        var margin = {top: 30, right: 30, bottom: 20, left: 100}
        width = 580 - margin.left - margin.right
        height = 300 - margin.top - margin.bottom;

        var svg = d3.select("#line_chart")
        .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("width",600)
            .attr("height",350)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        var x = d3.scaleTime()
        .domain(d3.extent(deathdays, function(d) { return d.dates_new; }))
        .range([ 0, width ]);

        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
        .domain([0, d3.max(deathdays, function(d) { return +d.deaths; })])
        .range([ height, 0 ]);var y = d3.scaleLinear()
        .domain([0, d3.max(deathdays, function(d) { return +d.deaths; })])
        .range([ height, 0 ]);

        svg.append("g")
          .call(d3.axisLeft(y));

        line = svg.append("path")
        .datum(deathdays)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.dates_new) })
            .y(function(d) { return y(d.deaths) })
            )


        var tooltip_2 = d3.select("body")
        .select('#line_chart')
        .append("div")
        .attr("data-html", "true")
        .style("position", "absolute")
        .style("z-index", "10")
        .style('margin-bottom','100px')
        .style("visibility", "hidden")
        .style("padding","4px 4px")
        .style("border","1px solid #333");

        svg.selectAll(".point")
        .data(deathdays)
        .enter().append("circle")
        .attr("class", "point")
        .attr("cx", function(d) { return x(d.dates_new); })
        .attr("cy", function(d) { return y(d.deaths); })
        .attr("r",2)
        .style("fill",'#160866')
        .on("mouseover", function(d) {
            // Display information about the data point
            d3.select(this).attr("r", 7)
            text = tooltip_2.text('Date:'+d.date +' Deaths:'+d.deaths)
            style = tooltip_2.style("visibility", "visible");
            return text,style
            
        })
        .on("mousemove", function(){
            return tooltip_2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
        })
        .on("mouseout", function(d) {
            // Hide the information about the data point
            d3.select(this).attr("r", 2)
            return tooltip_2.style("visibility", "hidden");
        })
        .on("click", function(d){
            highlightCircles(d.deaths)
        });


        d3.select("#line_chart")
        .select("svg")
        .select('g')
        .append('text')
        .attr("x", 180)
        .attr("y", 300)
        .text("Dates")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")

        d3.select("#line_chart")
        .select("svg")
        .select('g')
        .append('text')
        .attr("x", -50)
        .attr("y", 180)
        .text("No of Deaths")
        .style("font-size", "15px")
        .attr("alignment-baseline","middle")
        .attr('transform', 'rotate(-90, -50, 180)');

        d3.select("#line_chart")
        .select("svg")
        .select('g')
        .append('text')
        .attr("x", 20)
        .attr("y", -20)
        .text("Distribution of number of deaths over time")
        .style("font-size", "17px")
        .attr("alignment-baseline","middle")
        .attr('text-decoration',"underline");

    });

}

function giveStreetNames(){
    var workhouseCoords = [ 10.50, 13.5 ];
    var workhouseTextCoords = [ 10.50, 12 ];
    
    var svg = d3.select('svg').select('g');

    svg.append("rect")
    .attr("x", -(200 - (workhouseCoords[0])*35))
    .attr("y", 570- (workhouseCoords[1])*35)
    .attr('width',70)
    .attr('height',35)
    .style("stroke", "#f77474")
    .style("fill","#f77474")
    .attr('transform', 'rotate(-25)')


    svg.append('text')
    .attr("x", -(200 - (workhouseTextCoords[0])*35))
    .attr("y", 570- (workhouseTextCoords[1])*35)
    .text("Work House")
    .style("font-size", "10px")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(-25, 100, 50)');

    var breweryCoords = [ 13.6, 12.4 ];

    svg.append("rect")
    .attr("x", -(200 - (breweryCoords[0])*35))
    .attr("y", 570- (breweryCoords[1])*35)
    .attr('width',20)
    .attr('height',40)
    .style("stroke", "#b1ff4a")
    .style("fill","#b1ff4a")
    .attr('transform', 'rotate(-25)')

    var breweryTextCoords = [ 14.2, 12.2 ];

    svg.append('text')
    .attr("x", -(200 - (breweryTextCoords[0])*35))
    .attr("y", 570- (breweryTextCoords[1])*35)
    .text("Brewery")
    .style("font-size", "10px")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(60, 280, 143)');

    svg.append('text')
    .attr("x", -(200 - 11*35))
    .attr("y", 570- 17*35)
    .text("Oxford Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(-10, 185, -7.5)');

    svg.append('text')
    .attr("x", -(200 - 11*35))
    .attr("y", 570- 12.2*35)
    .text("Broad Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(-25, 185, -7.5)');

    svg.append('text')
    .attr("x", -(200 - 16*35))
    .attr("y", 570- 14.5*35)
    .text("Dean Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(65, 395, 80)');

    svg.append('text')
    .attr("x", -(200 - 5*35))
    .attr("y", 570- 8.5*35)
    .text("Conduit Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(-50, -25, 272.5)');

    svg.append('text')
    .attr("x", -(200 - 7*35))
    .attr("y", 570- 7.8*35)
    .text("Brewer Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(-40, 185, -7.5)');

    svg.append('text')
    .attr("x", -(200 - 17*35))
    .attr("y", 570- 4*35)
    .text("Regent Street")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr('transform', 'rotate(60, 395, 80)');
}

function highlightCircles(no_of_deaths){
    // console.log(no_of_deaths)
    var circles = d3.select('svg').select('g').selectAll("circle");
    
    var shuffles_circles = d3.shuffle(circles);

    var circles_array = []

    for (let i = 0; i < shuffles_circles['_groups']['0'].length; i++) {
        circles_array.push(shuffles_circles['_groups']['0'][i])
    }

    let selected = circles_array.slice(0,no_of_deaths);
    
    d3.select('svg').select('g').selectAll('circle')
    .data(circles_array)
    .attr("r", 3)
    .attr("stroke",function(d){ return d.style.fill });

    d3.select('svg').select('g').selectAll('circle')
    .data(selected)
    .attr("r", 6)
    .attr("stroke",'#4f0559')
    .attr("stroke-width",'3px');
}


function removePreviousDots(){
    
    d3.select("svg").select('g').selectAll('circle').remove();

    d3.select('#legends').select('#legends_g').selectAll('*').remove();

    d3.select("#bar_chart").select('#bar_chart_g').selectAll('*').remove();
    
}