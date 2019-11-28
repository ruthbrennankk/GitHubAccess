import React, { Component } from 'react'
import * as d3 from "d3";



class BubbleChart extends Component {

    constructor(props){
        super(props)
        this.createBubbleChart = this.createBubbleChart.bind(this)
    }

    componentDidMount() {
        this.createBubbleChart()
    }
    componentDidUpdate() {
        this.createBubbleChart()
    }

    createBubbleChart() {
        const node = this.node;

        // set the dimensions and margins of the graph
        var width = 450
        var height = 450

        // append the svg object to the body of the page
        var svg = d3.select(node)
        .append("svg")
            .attr("width", 450)
            .attr("height", 450)

        // create dummy data -> just one element per circle
        //var data = [{ "name": "A" }, { "name": "B" }, { "name": "C" }, { "name": "D" }, { "name": "E" }, { "name": "F" }, { "name": "G" }, { "name": "H" }]

        // Initialize the circle: all located at the center of the svg area
        var nodet = svg.append("g")
        .selectAll("circle")
        .data(this.props.data)
        .enter()
        .append("circle")
            .attr("r", 25)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", "#69b3a2")
            .style("fill-opacity", 0.3)
            .attr("stroke", "#69a2b2")
            .style("stroke-width", 4)

        // Features of the forces applied to the nodes:
        var simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping

        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
        simulation
            .nodes(this.props.data)
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