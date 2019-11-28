import React, { Component } from 'react'
import * as d3 from "d3";

class BubbleChart extends Component {
        
            constructor(props){
                super(props)
                this.createBubbleChart = this.createBubbleChart.bind(this)
                this.dragstarted = this.dragstarted.bind(this)
                this.dragged = this.dragged.bind(this)
                this.dragended = this.dragended.bind(this)
                this.simulation = '';
            }
        
            componentDidMount() {
                this.createBubbleChart()
            }
            componentDidUpdate() {
                this.createBubbleChart()
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
            }
        
            createBubbleChart() {
                const node = this.node;
                // set the dimensions and margins of the graph
                var width = 450
                var height = 450
                var maxSize = this.props.data[2]

                // append the svg object to the body of the page
                var svg = d3.select(node)
                .append("svg")
                    .attr("width", 450)
                    .attr("height", 450)

/*
                // create dummy data -> just one element per circle
                var data = [{ "name": "A", "group": 1 }, { "name": "B", "group": 1 }, { "name": "C", "group": 1 }, { "name": "D", "group": 1 }, { "name": "E", "group": 1 }, { "name": "F", "group": 1 },
                            { "name": "G", "group": 2 }, { "name": "H", "group": 2 }, { "name": "I", "group": 2 }, { "name": "J", "group": 2 }, { "name": "K", "group": 2 }, { "name": "L", "group": 2 },
                            { "name": "M", "group": 3 }, { "name": "N", "group": 3 }, { "name": "O", "group": 3 }]
*/

                // A scale that gives a X target position for each group
                var x = d3.scaleOrdinal()
                .domain(this.props.data[1])
                .range([50, 200, 340])

                // A color scale
                var color = d3.scaleOrdinal()
                .domain(this.props.data[1])
                .range([ "#F8766D", "#00BA38", "#619CFF"])

                // Initialize the circle: all located at the center of the svg area
                var nodet = svg.append("g")
                .selectAll("circle")
                .data(this.props.data[0])
                .enter()
                .append("circle")
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("r", function (d) { var size = d.size/((maxSize.toString().length-1)*10); if (size<100 && size > 2) return size; if (size < 5) return 5; } )
                    //.attr("r", 1)
                    .style("fill", function(d){ return color(d.group)})
                    .style("fill-opacity", 0.8)
                    .attr("stroke", "black")
                    .style("stroke-width", 4)
                    .call(d3.drag() // call specific function when circle is dragged
                        .on("start", this.dragstarted)
                        .on("drag", this.dragged)
                        .on("end", this.dragended));

                // Features of the forces applied to the nodes:
                this.simulation = d3.forceSimulation()
                    .force("x", d3.forceX().strength(0.5).x( function(d){ return x(d.group) } ))
                    .force("y", d3.forceY().strength(0.1).y( height/2 ))
                    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
                    .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
                    .force("collide", d3.forceCollide().strength(.1).radius(32).iterations(1)) // Force that avoids circle overlapping

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
                return <svg ref={node => this.node = node} width={500} height={500}/>
            }
        }
        export default BubbleChart;