var data = {
    nodes: [{
      id : 0,
      name: "A",
      x: 200,
      y: 150
    }, {
      id : 1,
      name: "B",
      x: 140,
      y: 300
    }, {
      id : 2,
      name: "C",
      x: 300,
      y: 300
    }, {
      id : 3,
      name: "D",
      x: 300,
      y: 180
    }],
    links: [{
      source: 0,
      target: 1
    }, {
      source: 1,
      target: 2
    }, {
      source: 2,
      target: 3
    }, ]
  };
 
  var svg = d3.select("body")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 800);
 
  var drag = d3.drag()
    .on("drag", function(event, object) {
      object.x += event.dx
      object.y += event.dy
      d3.select(this).attr("cx", event.x).attr("cy", event.y);
      links.each(function(link) {
        if (link.source == object.id) {
          d3.select(this).attr("x1", event.x).attr("y1", event.y);
        } else if (link.target == object.id) {
          d3.select(this).attr("x2", event.x).attr("y2", event.y);
        }
      });
    });
 
  var links = svg.selectAll("link")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", function(l) {
      var sourceNode = data.nodes.filter(function(d, i) {
        return i == l.source
      })[0];
      d3.select(this).attr("y1", sourceNode.y);
      return sourceNode.x
    })
    .attr("x2", function(l) {
      var targetNode = data.nodes.filter(function(d, i) {
        return i == l.target
      })[0];
      d3.select(this).attr("y2", targetNode.y);
      return targetNode.x
    })
    .attr("fill", "none")
    .attr("stroke", "white");
 
  var nodes = svg.selectAll("node")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", function(d) {
      return d.x
    })
    .attr("cy", function(d) {
      return d.y
    })
    .attr("r", 15)
    .call(drag);