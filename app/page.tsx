"use client";
import { select, selectAll, Selection } from "d3-selection";
import { useEffect, useRef, useState } from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import {max} from "d3-array";
const data = [
  { name: "foo", number: 1805 },
  { name: "bar", number: 1200 },
  { name: "baz", number: 1000 },
  { name: "qux", number: 5 },
  { name: "quux", number: 1500 },
];
const size = { width: 1000, height: 500 };
export default function Home() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const maxNumber = max(data, (d) => d.number);
  const y = scaleLinear().domain([0, maxNumber!]).range([0, size.height]);
  console.log("y(O)", y(0));
  console.log("y(5042)", y(1554));

  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, size.width])
    .padding(0.1);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      selection
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.name)!)
        .attr("y", (d) => (size.height - y(d.number)))
        .attr("width", x.bandwidth)
        .attr("height", (d) => y(d.number))
        .attr("fill", "orange");
    }
  }, [selection]);
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Bar Chart</h1>
      <svg ref={svgRef} width={size.width} height={size.height}></svg>
    </main>
  );
}
