/**
 * Template for composite chart with line chart for population
 * histogram for population change per year and a sidebar
 * displaying various metrics for the selected year.
 *
 * Render the chart using the highlight parameter in the options
 * object to change the focused year.
 *
 * This chart has four main parts:
 *  * Sidebar - displays the contents of the selected year
 *  * Upper - displays the population line
 *  * Lower - displays histogram of change per year
 *  * Triggers - transparent overlays to trigger clicks
 *
 */

import Base_Template from './baseTemplate';
// import util from './template-utils';
import color from './colors';
import d3 from '@/assets/d3';

function Template(svg) {
  Base_Template.apply(this, arguments);

  this.padding = { top: 40, left: 80, right: 20, bottom: 20 };
  this.height1 = 400;
  this.gapX = 50;
  this.gapY = 70;
  this.height2 = 80;
  this.height = this.height1 + this.gapY + this.height2;
  this.sidebarWidth = 250;
  this.width1 = 750; // width of upper and lower graphs
  this.width = this.width1 + this.gapX + this.sidebarWidth;
  this.x = d3.scaleTime();
  this.y = d3.scaleLinear();
  this.y2 = d3.scaleLinear();

  this.barWidth;
  this.sidebar;
  this.upper;
  this.lower;
  this.triggersContainer;
  this.selected;

  this.line = d3
    .line()
    .x(d => this.x(this.parseDate(d.date)))
    .y(d => this.y(d.population));

  this.render = function(data, options = {}) {
    if (!this.commonRender(data, options)) return;

    this.highlight = options.highlight || this.data.data.actual[this.data.data.actual.length - 1].date;
    this.selected = this.data.data.actual.filter(d => d.date === this.highlight)[0];
    this.width1 = this.parentWidth() - this.padding.left - this.padding.right - this.gapX - this.sidebarWidth;
    this.width1 = d3.max([this.width1, 300]);
    this.width = this.width1 + this.gapX + this.sidebarWidth;
    this.height = this.height1 + this.gapY + this.height2;

    this.svg
      .transition()
      .duration(this.duration)
      .attr('height', this.padding.top + this.height + this.padding.bottom + this.sourceHeight)
      .attr('width', this.padding.left + this.width + this.padding.right);

    this.resetScales();
    this.drawSidebar();
    this.drawUpper();
    this.drawLower();
    this.drawTriggers();
    this.drawSource('Statistisk sentralbyrå (test)');
  };

  // Empties canvas and creates the neccessary DOM elements
  // for this chart
  this.created = function() {
    this.canvas.selectAll('*').remove();
    this.canvas.remove();

    this.createSidebarElements();
    this.createUpperElements();
    this.createLowerElements();

    this.triggersContainer = this.svg.append('g').attr('class', 'triggers');
  };

  // Creates the DOM elements for the sidebar
  // called from this.created()
  this.createSidebarElements = function() {
    this.sidebar = this.svg.append('g').attr('class', 'sidebar');

    let section_year = this.sidebar.append('g').attr('class', 'section-year');
    section_year
      .append('rect')
      .attr('class', 'section-year__bg')
      .attr('width', 88)
      .attr('rx', 4)
      .attr('height', 40)
      .attr('fill', color.purple);
    section_year
      .append('text')
      .attr('class', 'section-year__text')
      .attr('fill', 'white')
      .attr('y', 30)
      .attr('font-size', 26)
      .attr('font-weight', 700)
      .attr('text-anchor', 'middle')
      .attr('x', 44);

    let section_population = this.sidebar
      .append('g')
      .attr('class', 'section-population')
      .attr('transform', 'translate(0, 70)');
    section_population.append('rect').attr('class', 'divider');
    section_population
      .append('text')
      .attr('class', 'label')
      .text('Befolkning');
    section_population.append('text').attr('class', 'value');

    let section_change = this.sidebar
      .append('g')
      .attr('class', 'section-change')
      .attr('transform', 'translate(0, 140)');
    section_change.append('rect').attr('class', 'divider');
    section_change
      .append('text')
      .attr('class', 'label')
      .text('Befolkningsvekst');
    section_change.append('text').attr('class', 'value');

    section_change.append('rect').attr('class', 'bar');

    this.sidebar
      .selectAll('rect.divider')
      .attr('height', 2)
      .attr('width', this.sidebarWidth)
      .attr('fill', color.purple);

    this.sidebar
      .selectAll('text.value')
      .attr('font-size', 16)
      .attr('y', 26)
      .attr('font-weight', '700')
      .attr('fill', color.purple)
      .attr('text-anchor', 'end')
      .attr('x', this.sidebarWidth)
      .text('70');

    this.sidebar
      .selectAll('text.label')
      .attr('font-size', 16)
      .attr('font-weight', '400')
      .attr('y', 26)
      .attr('fill', color.purple);
  };

  // Creates the DOM elements for the upper graph
  // called from this.created()
  this.createUpperElements = function() {
    this.upper = this.svg.append('g').attr('class', 'upper');
    this.xAxis = this.upper.append('g').attr('class', 'axis x');
    this.yAxis = this.upper.append('g').attr('class', 'axis y');

    this.upper
      .append('path')
      .attr('class', 'projection')
      .attr('fill', color.blue);

    this.upper
      .append('path')
      .attr('class', 'expected')
      .attr('fill', 'none')
      .attr('stroke', color.purple);

    this.upper
      .append('path')
      .attr('class', 'valueLine')
      .attr('fill', 'none')
      .attr('stroke', color.purple)
      .attr('stroke-width', 3);

    this.upper
      .append('line')
      .attr('class', 'currentDate')
      .attr('stroke', color.purple)
      .attr('opacity', 0.7)
      .attr('stroke-width', 1)
      .style('stroke-dasharray', '3,3');

    this.upper
      .append('text')
      .attr('class', 'populationTooltip')
      .attr('font-size', 12)
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(-10, -3)');

    this.upper
      .append('line')
      .attr('class', 'highlightLine')
      .attr('stroke-width', 5)
      .attr('stroke-opacity', 0.1)
      .attr('stroke', color.yellow);

    this.upper
      .append('line')
      .attr('class', 'highlightLine')
      .attr('stroke-width', 2)
      .attr('stroke', color.yellow);

    let highlightContainer = this.upper.append('g').attr('class', 'highlightContainer');

    highlightContainer
      .append('rect')
      .attr('class', 'highlightDateBox')
      .attr('fill', color.yellow)
      .attr('height', 26)
      .attr('width', 48)
      .attr('transform', 'translate(-24, 0)');

    highlightContainer
      .append('text')
      .attr('class', 'highlightText')
      .attr('fill', color.purple)
      .attr('font-size', 12)
      .attr('font-weight', 700)
      .attr('y', 18)
      .attr('text-anchor', 'middle');
  };

  // Creates the DOM elements for the lower histogram
  // called from this.created()
  this.createLowerElements = function() {
    this.lower = this.svg.append('g').attr('class', 'lower');
    this.lower.append('g').attr('class', 'bars');
    this.lower
      .append('line')
      .attr('class', 'zeroline')
      .attr('stroke-width', 1)
      .attr('stroke', color.purple);
    this.y2Axis = this.lower.append('g').attr('class', 'axis y');

    this.lower
      .append('text')
      .attr('class', 'sectionHeading')
      .attr('fill', color.purple)
      .attr('font-weight', 500)
      .text('Befolkningsendring per år');
  };

  // Updates the sidebar contents on each render
  this.drawSidebar = function() {
    this.sidebar.attr('transform', `translate(${this.padding.left + this.width1 + this.gapX}, ${this.padding.top})`);

    this.sidebar.select('text.section-year__text').text(this.formatYear(this.parseDate(this.selected.date)));
    this.sidebar.select('g.section-population text.value').text(this.selected.population);
    this.sidebar.select('g.section-change text.value').text(this.selected.change);
  };

  // Updates the upper line graph on each render.
  this.drawUpper = function() {
    this.upper.attr('transform', `translate(${this.padding.left}, ${this.padding.top})`);
    this.xAxis.attr('transform', `translate(0, ${this.height1})`);
    this.upper.select('text.highlightText').text(this.formatYear(this.parseDate(this.highlight)));

    this.upper
      .select('g.highlightContainer')
      .attr('transform', `translate(${this.x(this.parseDate(this.highlight))}, ${this.height1})`);

    this.upper
      .select('text.populationTooltip')
      .text(this.selected.population)
      .attr('y', this.y(this.selected.population))
      .attr('x', this.x(this.parseDate(this.selected.date)));

    this.upper
      .selectAll('line.highlightLine')
      .attr('x1', this.x(this.parseDate(this.highlight)))
      .attr('x2', this.x(this.parseDate(this.highlight)))
      .attr('y1', 0)
      .attr('y2', this.height1);

    this.upper
      .select('line.currentDate')
      .attr('x1', this.x(new Date()))
      .attr('x2', this.x(new Date()))
      .attr('y1', 0)
      .attr('y2', this.height1);

    this.upper
      .select('path.valueLine')
      .datum(this.data.data)
      .attr('d', d => this.line(d.actual));

    this.drawProjection();
  };

  // Updates the lower histogram on each render
  this.drawLower = function() {
    this.barWidth = this.x(this.parseDate('2018-01-01')) - this.x(this.parseDate('2017-01-01')) - 1;

    this.lower.attr('transform', `translate(${this.padding.left}, ${this.padding.top + this.height1 + this.gapY})`);
    this.lower
      .select('line.zeroline')
      .attr('x1', 0)
      .attr('x2', this.width1)
      .attr('y1', this.y2(0))
      .attr('y2', this.y2(0));

    let bar = this.lower
      .select('g.bars')
      .selectAll('rect.bar')
      .data(this.data.data.actual);
    let barE = bar
      .enter()
      .append('rect')
      .attr('class', 'bar');
    bar.exit().remove();
    bar = bar.merge(barE);

    bar
      .attr('width', this.barWidth)
      .attr('x', d => this.x(this.parseDate(d.date)) - this.barWidth / 2)
      .attr('height', d => Math.abs(this.y2(0) - this.y2(d.change)))
      .attr('y', d => (d.change > 0 ? this.y2(d.change) : this.y2(0)))
      .attr('fill', d => {
        if (d.date === this.highlight) return color.purple;
        return d.change > 0 ? color.blue : color.red;
      });

    this.lower
      .select('text.sectionHeading')
      .attr('y', -5)
      .attr('x', 20);
  };

  // Draws the projected path on the upper graph
  // called from this.drawUpper()
  this.drawProjection = function() {
    // Draw projection
    let lastDate = this.data.data.actual[this.data.data.actual.length - 1];
    let startPos = { x: this.x(this.parseDate(lastDate.date)), y: this.y(lastDate.population) };
    let lowPos = {
      x: this.x(this.parseDate(this.data.data.projection.date)),
      y: this.y(this.data.data.projection.low),
    };
    let expPos = {
      x: this.x(this.parseDate(this.data.data.projection.date)),
      y: this.y(this.data.data.projection.expected),
    };
    let highPos = {
      x: this.x(this.parseDate(this.data.data.projection.date)),
      y: this.y(this.data.data.projection.high),
    };

    let projectionPathData = `M${startPos.x},${startPos.y} L${lowPos.x},${lowPos.y} L${highPos.x},${highPos.y}z`;
    let expectedPathData = `M${startPos.x},${startPos.y} L${expPos.x},${expPos.y}`;
    this.upper.select('path.projection').attr('d', projectionPathData);
    this.upper.select('path.expected').attr('d', expectedPathData);
  };

  // Draws the transparent triggers on each render
  this.drawTriggers = function() {
    this.triggersContainer.attr('transform', `translate(${this.padding.left}, ${this.padding.top})`);

    let trigger = this.triggersContainer.selectAll('rect').data(this.data.data.actual);
    let triggerE = trigger.enter().append('rect');
    trigger.exit().remove();
    trigger = trigger.merge(triggerE);

    trigger
      .attr('width', this.barWidth + 1)
      .attr('height', this.height1 + this.gapY + this.height2)
      .attr('x', d => this.x(this.parseDate(d.date)) - this.barWidth / 2)
      .style('cursor', 'pointer')
      .on('mouseover', d => {
        this.render(this.data, { highlight: d.date });
      })
      .on('click keyup', (d, i, j) => {
        if (d3.event && d3.event.type === 'keyup' && d3.event.key !== 'Enter') return;
        if (d3.event && d3.event.type === 'click') j[i].blur();
        this.render(this.data, { highlight: d.date });
      })
      .on('mouseover', function() {
        d3.select(this).attr('fill-opacity', 0.03);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(this.duration)
          .duration(40)
          .attr('fill-opacity', 0);
      })
      .transition()
      .duration(this.duration)
      .duration(1000)
      .attr('fill-opacity', 0)
      .attr('tabindex', 0);
  };

  // Sets and draws all the scales and axis
  // for the whole template on each render.
  this.resetScales = function() {
    let dates = d3.extent(this.data.data.actual.concat(this.data.data.projection).map(d => this.parseDate(d.date)));
    dates[0] = d3.timeYear.offset(dates[0], -2);
    let minPop = d3.min(this.data.data.actual.concat(this.data.data.projection).map(d => d.population || d.low)) / 1.5;
    let maxPop =
      d3.max(this.data.data.actual.concat(this.data.data.projection).map(d => d.population || d.high)) * 1.15;

    this.y2
      .range([this.height2, 0])
      .domain(d3.extent(this.data.data.actual.map(d => d.change).map((d, i) => (i == 1 ? d * 1.3 : d))));
    this.x.range([0, this.width1]).domain(dates);
    this.y.range([this.height1, 0]).domain([minPop, maxPop]);
    this.xAxis.call(d3.axisBottom(this.x).ticks(this.width1 / 60));
    this.yAxis.call(d3.axisLeft(this.y).ticks(this.height1 / 40));
    this.y2Axis.call(d3.axisLeft(this.y2).ticks(this.height2 / 20));
  };

  this.init(svg);
}

export default Template;
