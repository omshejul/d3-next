"use client";
import { select, selectAll, Selection } from "d3-selection";
import { useEffect, useRef, useState } from "react";

const data = [
  { units: 100, color: "red" },
  { units: 250, color: "blue" },
  { units: 30, color: "green" },
  { units: 50, color: "yellow" },
  { units: 80, color: "purple" },
  { units: 120, color: "orange" },
  { units: 200, color: "pink" },
];
export default function Home() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      console.log("selection", selection);
      const rects = selection
        .selectAll("rect")
        .data(data)
        .attr("width", 100)
        .attr("height", (d) => d.units)
        .attr("fill", (d) => d.color)
        .attr("x", (_, index) => index * 100);
      
        rects
          .enter()
          .append("rect")
          .attr("width", 100)
          .attr("height", (d) => d.units)
          .attr("fill", (d) => d.color)
          .attr("x", (_, index) => index * 100);
      

      console.log(selection);
    }

    // selectAll("rect")
    //   .attr("width", 100)
    //   .attr("height", 100)
    //   .attr("fill", "blue")
    //   .attr("x", (_, index) => index);
  }, [selection]);
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Bar Chart</h1>
      <svg ref={svgRef} width={1000}>
        <rect />
        <rect />
        <rect />
      </svg>
    </main>
  );
}
