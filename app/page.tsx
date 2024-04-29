"use client";
import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { easeExpInOut } from "d3-ease";

const json = [
  { name: "foo", number: 1805 },
  { name: "bar", number: 1200 },
  { name: "baz", number: 1000 },
  { name: "qux", number: 500 },
  { name: "quux", number: 1500 },
];

const size = {
  width: 1000,
  height: 500,
  chartWidth: 900,
  chartHeight: 400,
  margin: 50,
};

export default function Home() {
  const svgRef = useRef(null);
  const [data, setData] = useState(json);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 
  
    const maxNumber = max(data, (d) => d.number) ?? 0;
    const y = scaleLinear().domain([0, maxNumber]).range([size.chartHeight, 0]);
    const x = scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, size.chartWidth])
      .padding(0.1);
  
    const g = svg.append("g").attr("transform", `translate(${size.margin}, ${size.margin})`);
  
    g.append("g")
      .attr("transform", `translate(0, ${size.chartHeight})`)
      .call(axisBottom(x));
  
    g.append("g").call(axisLeft(y));
  
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.number))
      .attr("width", x.bandwidth())
      .attr("height", (d) => size.chartHeight - y(d.number))
      .attr("fill", "#2662c1")
      .on("mouseover", (event, d) => {
        setTooltip({
          visible: true,
          content: `${d.name}:${d.number}`,
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mousemove", (event) => {
        setTooltip((prevTooltip) => ({
          ...prevTooltip,
          x: event.pageX,
          y: event.pageY,
        }));
      })
      .on("mouseout", () => setTooltip({ ...tooltip, visible: false }));
  
  }, [data]);
  

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-semibold text-3xl">Bar Chart</h1>
      {tooltip.visible && (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      transform: `translate(${tooltip.x}px, ${tooltip.y}px) translate(-50%, -120%)`,
      transition: 'transform 0.6s cubic-bezier(.26,.85,.37,1.23)',
      visibility: tooltip.visible ? "visible" : "hidden",
      padding: "0.5rem 1rem",
      background: "hsla(0, 0%, 0%, 0.9)",
      border: "1px solid hsla(0, 0%, 50%, 0.5)",
      backdropFilter: "blur(10px)",  
      color: "white",
      fontWeight: "bold",
      borderRadius: "10px",
      pointerEvents: "none",
      
    }}
    className="tooltip"
  >
    {tooltip.content}
  </div>
)}

      <div className="border">
        <svg ref={svgRef} width={size.width} height={size.height}></svg>
      </div>
    </main>
  );
}

