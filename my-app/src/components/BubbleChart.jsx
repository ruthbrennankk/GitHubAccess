import React, { Component } from 'react'
import * as d3 from "d3";

class BubbleChart extends Component {
        
            constructor(props){
                super(props)
                this.createBubbleChart = this.createBubbleChart.bind(this)
                this.dragstarted = this.dragstarted.bind(this)
                this.dragged = this.dragged.bind(this)
                this.dragended = this.dragended.bind(this)
                this.getColourArray = this.getColourArray.bind(this)
                this.callHide = this.callHide.bind(this)
                this.callShow = this.callShow.bind(this)
                this.simulation = '';
                
            }
        
            componentDidMount() {
                this.createBubbleChart()
            }

            componentDidUpdate() {
                this.createBubbleChart()
            }

            callShow(d) {
                console.log("show " + d.name)
            }

            callHide(d) {
                console.log("hide " + d.name)
            }

            // What happens when a circle is dragged?
            dragstarted(d) {
                if (!d3.event.active) this.simulation.alphaTarget(.03).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
            dragended(d) {
                if (!d3.event.active) this.simulation.alphaTarget(.03);
                d.fx = null;
                d.fy = null;
                console.log("dragend" + d);
            }

            getColourArray() {
                var arr = [];
                for (var i = 0; i < this.props.data[1].length; i++) {
                    arr[i] = d3.rgb(i*224%225,0,i*983%225);
                } 
                return arr;
            }

            getScaleArray(width) {
                var arr = [];
                for (var i = 0; i < this.props.data[1].length; i++) {
                    arr[i] = width*i/this.props.data[1].length;
                } 
                return arr;
            }
        
            createBubbleChart() {
                const node = this.node;

                d3.select(node)
                    .selectAll("circle")
                    .data(this.props.data)
                    .enter()
                    .append("circle")
                
                d3.select(node)
                    .selectAll("circle")
                    .data(this.props.data)
                    .exit()
                    .remove()

                // set the dimensions and margins of the graph
                var width = 1000
                var height = 500
                var maxSize = this.props.data[2]

                // append the svg object to the body of the page
                var svg = d3.select(node)
                .append("svg")
                    .attr("width", width)
                    .attr("height", height)

                // A scale that gives a X target position for each group
                var x = d3.scaleOrdinal()
                .domain(this.props.data[1])
                .range(this.getScaleArray(width));

                // A color scale
                var color = d3.scaleOrdinal()
                .domain(this.props.data[1])
                .range(this.getColourArray());

                // create a tooltip
                var tooltip = d3.select("div")
	                    .append("t")
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("background-color", "white")
                        .style("border", "solid")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("padding", "5px")
                        //.text("a simple tooltip");


                // Initialize the circle: all located at the center of the svg area
                var nodet = svg.append("g")
                .selectAll("circle")
                .data(this.props.data[0])
                .enter()
                .append("circle")
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("r", function (d) { var size = d.size/((maxSize.toString().length-1)*10); if (size<100 && size > 2) return size; if (size < 5) return 5; } )
                    .style("fill", function(d){ return color(d.group)})
                    .style("fill-opacity", 0.8)
                    .attr("stroke", "black")
                    .style("stroke-width", 1)
                   .on("mouseover", function(d){console.log(d); return tooltip.style("visibility", "visible");})
                   .on("mousemove", function(d){console.log(d);
                                                    var language = 'multi';
                                                    var mouseZero = d3.mouse(this)[0];
                                                    var mouseOne = d3.mouse(this)[1];
                                                    if (d.group!=null) {
                                                        language = d.group;
                                                    }
                                                    if (mouseZero<300) {
                                                       mouseZero = 300;
                                                    } else if (mouseZero>600) {
                                                        mouseZero/=2;
                                                    }
                                                    console.log(mouseZero)
                                                    return tooltip.html('<b>' +"Repository Name: " + d.name + '</b>' + "<br>" + "Language: " + language + "<br>" + d.type + ": " + d.size)
                                                                            .style("left", (mouseOne) + "px")
                                                                            .style("top", (mouseZero) + "px");})
                    .on("mouseout", function(d){console.log(d);return tooltip.style("visibility", "hidden");})
                    .call(d3.drag() // call specific function when circle is dragged
                        .on("start", this.dragstarted)
                        .on("drag", this.dragged)
                        .on("end", this.dragended));
                     
                    if (this.props.lang) {
                        // Features of the forces applied to the nodes:
                        this.simulation = d3.forceSimulation()
                            .force("x", d3.forceX().strength(0.1).x( function(d){ return x(d.group) } ))
                            .force("y", d3.forceY().strength(0.2).y( height/2 ))
                            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
                            .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
                            .force("collide", d3.forceCollide().strength(1).radius(function(d){var size = d.size/((maxSize.toString().length-1)*10); if (size<100 && size > 2) return size; if (size < 5) return 5;}).iterations(1)) // Force that avoids circle overlapping

                    } else {
                        // Features of the forces applied to the nodes:
                        this.simulation = d3.forceSimulation()
                            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
                            .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
                            .force("collide", d3.forceCollide().strength(0.2).radius(function(d){var size = d.size/((maxSize.toString().length-1)*10); if (size<100 && size > 2) return size; if (size < 5) return 5;}).iterations(1)) // Force that avoids circle overlapping

                    }
                
                // Apply these forces to the nodes and update their positions.
                // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
                this.simulation
                    .nodes(this.props.data[0])
                    .on("tick", function(d){
                    nodet
                        .attr("cx", function(d){ return d.x; })
                        .attr("cy", function(d){ return d.y; })
                    });
            }
        
            render() {
                return (
                    <div>
                        <svg ref={node => this.node = node} width={750} height={500}/>
                    </div>
                )
            }
        }
export default BubbleChart;