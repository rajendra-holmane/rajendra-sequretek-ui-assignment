import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface ColorData {
  year: number;
  color: string;
}

const colorData: ColorData[] = [
  { year: 2000, color: '#98B2D1' },
  { year: 2001, color: '#C74375' },
  { year: 2002, color: '#BF1932' },
  { year: 2003, color: '#7BC4C4' },
  { year: 2004, color: '#E2583E' },
  { year: 2005, color: '#53B0AE' }
];

const BarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.clientWidth || 0;
    const height = svg.node()?.clientHeight || 0;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(colorData.map(d => d.year.toString()))
      .range([margin.left, innerWidth + margin.left])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(colorData, d => d.year) || 0])
      .nice()
      .range([innerHeight + margin.top, margin.top]);

    svg.selectAll('*').remove();

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('rect')
      .data(colorData)
      .enter().append('rect')
      .attr('x', d => xScale(d.year.toString()) || 0)
      .attr('y', d => yScale(d.year))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight + margin.top - yScale(d.year))
      .attr('fill', d => d.color);

    svg.append('g')
      .attr('transform', `translate(0,${innerHeight + margin.top})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, []);

  return (
    <svg ref={svgRef} width="600" height="400"></svg>
  );
};

export default BarChart;
