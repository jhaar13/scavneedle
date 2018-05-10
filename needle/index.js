/* global d3 */

document.addEventListener('DOMContentLoaded', () => {
  buildNeedle();
});

// put your code for the three handed clock in here
/*function buildThreeHandClock() {
  const width = 300;
  const height = 300;
  const margin = {left: 10, right: 10, top: 10, bottom: 10};
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.bottom - margin.top;
  const x = d3.scaleLinear().domain([-1, 1]).range([margin.left, plotWidth]);
  const y = d3.scaleLinear().domain([-1, 1]).range([margin.top, plotHeight]);
  const svg = d3.select('.vis-container').append('svg')
    .attr('width', width)
    .attr('height', height);

  const numTicks = 12 * 5;
  const tickData = [...new Array(numTicks)].map((d, i) => i);
  svg.selectAll('.tick').data(tickData)
    .enter().append('line')
      .attr('class', 'tick')
      .attr('x1', i => x(0.9 * Math.cos(i / numTicks * Math.PI * 2)))
      .attr('x2', i => x(0.8 * Math.cos(i / numTicks * Math.PI * 2)))
      .attr('y1', i => y(0.9 * Math.sin(i / numTicks * Math.PI * 2)))
      .attr('y2', i => y(0.8 * Math.sin(i / numTicks * Math.PI * 2)))
      .attr('stroke-width', i => i % 5 ? 2 : 5)
      .attr('stroke', '#000');

  svg.selectAll('.tick-label').data(tickData)
    .enter().append('text')
      .attr('class', 'tick-label')
      .attr('x', i => x(Math.cos(i / numTicks * Math.PI * 2 - Math.PI / 3)))
      .attr('y', i => y(Math.sin(i / numTicks * Math.PI * 2 - Math.PI / 3)))
      .attr('text-anchor', 'middle')
      .text(i => i % 5 ? '' : ((i + 5) / 5));

  let hourAngle = 0;
  let minuteAngle = 0;
  let secondAngle = 0;
  const hourHand = svg.append('line')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('class', 'hour-hand')
    .attr('stroke', '#66f')
    .attr('stroke-width', 10)
    .attr('stroke-linecap', 'round');
  const minuteHand = svg.append('line')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('class', 'minute-hand')
    .attr('stroke', '#609')
    .attr('stroke-width', 8)
    .attr('stroke-linecap', 'round');
  const secondHand = svg.append('line')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('class', 'second-hand')
    .attr('stroke', '#f8a')
    .attr('stroke-width', 6)
    .attr('stroke-linecap', 'round');
  movehands();
  function movehands() {
    hourAngle += 0.0001;
    hourAngle = hourAngle > Math.PI * 2 ? 0 : hourAngle;
    minuteAngle += 0.0012;
    minuteAngle = minuteAngle > Math.PI * 2 ? 0 : minuteAngle;
    secondAngle += 0.072;
    secondAngle = secondAngle > Math.PI * 2 ? 0 : secondAngle;
    hourHand
      .transition()
      .duration(100)
      .attr('x2', x(0.5 * Math.cos(hourAngle)))
      .attr('y2', y(0.5 * Math.sin(hourAngle)))
      .on('end', movehands);
    minuteHand
      .transition()
      .duration(100)
      .attr('x2', x(0.6 * Math.cos(minuteAngle)))
      .attr('y2', y(0.6 * Math.sin(minuteAngle)))
      .on('end', movehands);
    secondHand
      .transition()
      .duration(100)
      .attr('x2', x(0.7 * Math.cos(secondAngle)))
      .attr('y2', y(0.7 * Math.sin(secondAngle)))
      .on('end', movehands);
  }
}*/

// We've provided the correct colors for you
// they are order such that the 12oclock wedge is first, the 1olock wedge is second
const CHROMA_COLORS = [
  '#4286f4',
  '#7aadff',
  '#bad4ff',
  '#ffffff',
  '#ffbaba',
  '#ff7070',
  '#ff3a3a'
];
// put your code for the chromachron in here
function buildNeedle() {
  const width = 500;
  const height = 300;
  const radius = 100;
  const svg = d3.select('.vis-container').append('svg')
      .attr('width', width)
      .attr('height', height)
    .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  const color = d3.scaleOrdinal().domain([0, 1, 2, 3, 4, 5, 6]).range(CHROMA_COLORS);
  const x = d3.scaleLinear().domain([-1, 1]).range([10, 80]);
  const y = d3.scaleLinear().domain([-1, 1]).range([10, 80]);

  const numSlices = 7;
  const sliceData = [...new Array(numSlices)].map((d, i) => i);
  const arc = d3.arc()
    .innerRadius(20)
    .outerRadius(radius)
    .startAngle(i => i / numSlices * Math.PI - Math.PI / 2)
    .endAngle(i => (i + 1) / numSlices * Math.PI - Math.PI / 2);

  let angle = 0;

  svg.selectAll('.arc')
    .data(sliceData)
    .enter().append('path')
      .attr('class', 'arc')
      .attr('d', i => arc(i))
      .style('fill', i => color(i));

  svg.append('text')
    .attr('transform', 'translate(-180, 0)')
    .text('Win by a lot');
  svg.append('text')
    .attr('transform', 'translate(100, 0)')
    .text('Lose by a lot');

  const needle = svg.append('line')
    .attr('x1', x(0))
    .attr('y1', y(0))
    .attr('transform', 'translate(-45, -50)')
    .attr('class', 'hand')
    .attr('stroke', '#000')
    .attr('stroke-width', 10)
    .attr('stroke-linecap', 'round');

  movehand();
  function movehand() {
    angle = Math.random() * Math.PI + Math.PI;
    needle
      .transition()
      .duration(100000)
      .attr('x2', x(2 * Math.cos(angle)))
      .attr('y2', y(2 * Math.sin(angle)))
      .on('end', movehand);
  }
}
