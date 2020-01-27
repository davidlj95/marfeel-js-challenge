import * as d3 from "d3";
import {getObjectLength, isEmptyObject, sumObjectValues} from "../../helpers/object";
import {isEmptyArray} from "../../helpers/array";
import {defaultNumberFormatter} from "../../helpers/formatter";
import {NO_SORT, SORT_ASCENDING, SORT_DESCENDING} from "../../constants/sort";

/**
 * A web component containing a Doughnut chart with a histogram embedded.
 *
 * Designed for Marfeel
 *
 * Also displays the grand total of the values in the doughnut chart with a title.
 */
export class MarfeelDoughnutGramChart extends HTMLElement {
    constructor(
        chartData,
        title = "Total",
        formatter = defaultNumberFormatter,
        sort = NO_SORT,
        colors,
        diameter = 245,
        margin = 0,
        strokeWidth = 7,
        histogramMargin = 10
    ) {
        super();
        this.shadow = this.attachShadow({mode: 'open'});

        this.doughnutData = chartData['doughnut'];
        this.histogramData = chartData['histogram'];
        this.isDataEmpty = isEmptyObject(chartData) || (isEmptyObject(this.doughnutData) && isEmptyArray(this.histogramData));
        if (this.isDataEmpty) return;

        this.diameter = diameter;
        this.outerRadius = this._calculateRadius(diameter, margin);
        this.innerRadius = this.outerRadius - strokeWidth;
        this.title = title;
        this.formatter = formatter;
        this.sort = sort;
        this.colors = colors;
        this.histogramMargin = histogramMargin;
    }

    _calculateRadius(diameter, margin) {
        return diameter / 2 - margin / 2;
    }

    connectedCallback() {
        if (this.isDataEmpty) console.warn('Empty doughnut chart');
        else this.render();
    }

    render() {
        this.renderCss();
        this.renderHtml();
    }

    renderCss() {
        const styleElement = document.createElement("style");
        const doughnutCss = !!this.doughnutData ? [
            this._renderDetailsCss(),
            this._renderDefaultArcColorsCss(),
            this._renderDefaultTextCss(),
            this._renderDefaultQuarterLinesCss()
        ] : [];
        const histogramCss = !!this.histogramData ? [this._renderDefaultHistogramCss()] : [];
        styleElement.innerHTML = [
            this._renderStructureCss(),
            ...doughnutCss,
            ...histogramCss
        ].join(" ");
        this.shadow.appendChild(styleElement);
    }

    _renderStructureCss() {
        const containerCss = ".container { display: flex; flex-direction: column; justify-content: center }";
        const chartCss = "#chart { display: flex; flex-direction: column; align-items: center}";
        return [
            containerCss,
            chartCss
        ].join(" ");
    }

    _renderDetailsCss() {
        const detailsMinWidthCss = `#details { min-width: ${this.diameter * 1.5}px }`;
        const detailsContainerCss = "#details { display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-top: 1em }";
        const detailContainerCss = ".detail { flex-grow: 1; flex-basis: 50% }";
        const detailAlignCss = "#details > .detail:first-child { text-align: left } #details > .detail:last-child { text-align: right } ";
        const detailTitleCss = "#details h4 { margin: 0; }";
        const detailValueCss = "#details .value { margin-left: 1em; color: grey}";
        return [
            detailsMinWidthCss,
            detailsContainerCss,
            detailContainerCss,
            detailAlignCss,
            detailTitleCss,
            detailValueCss,
            detailValueCss
        ].join(" ");
    }

    _renderDefaultArcColorsCss() {
        const arcColors = [];
        if(this.colors && this.colors.accents && this.colors.accents.length >= getObjectLength(this.doughnutData)) {
            for (const [index, color] of this.colors.accents.entries()) {
                arcColors.push(`.arc-color-${index} { fill: ${color}; color: ${color} }`);
            }
        } else {
            const valuesLength = getObjectLength(this.doughnutData);
            const increment = 100 / valuesLength;
            const base = 100 / (valuesLength + 2);
            for (let i = 0; i < valuesLength; i++) {
                const colorPosition = (i * increment + base) / 100;
                const color = d3.interpolateGreys(colorPosition);
                arcColors.push(`.arc-color-${i} { fill: ${color}; color: ${color} }`)
            }
        }
        return arcColors.join(" ")
    }

    _renderDefaultTextCss() {
        const textStyle = "text { text-anchor: middle }";
        const titleTextStyle = "text.title { text-transform: uppercase; font-weight: bold; font-size: 27px; fill: #AFAFAF }";
        const totalTextStyle = "text.total { text-transform: uppercase; font-weight: bold; font-size: 33px; color: #4A4A4A }";
        const textStyles = [textStyle, titleTextStyle, totalTextStyle];
        return textStyles.join(" ");
    }

    _renderDefaultQuarterLinesCss() {
        return "line.quarter { stroke: lightgrey }"
    }

    _renderDefaultHistogramCss() {
        const histogramCss = [];
        if(this.colors && this.colors.histogram && this.colors.histogram.area) {
            histogramCss.push(`path.histogram.area { fill: ${this.colors.histogram.area} }`)
        } else {
            histogramCss.push("path.histogram.area { fill: lightgrey }")
        }
        if(this.colors && this.colors.histogram && this.colors.histogram.line) {
            histogramCss.push(`path.histogram.line { fill: none; stroke-width: 3px; stroke: ${this.colors.histogram.line} }`);
        } else {
            histogramCss.push("path.histogram.line { fill: none; stroke-width: 3px; stroke: grey }");
        }
        return histogramCss.join(" ");
    }

    renderHtml() {
        this.setAttribute("class", this.title.toLowerCase());
        const container = this._renderStructureHtml();
        const svg = this._renderBaseSvg(container);
        if (this.doughnutData) {
            this._renderDetailsHtml();
            const arcs = this._createD3PieArcs();
            this._renderSvgTexts(svg);
            this._renderSvgArcs(svg, arcs);
            this._renderQuarterLines(svg);
        }
        if (this.histogramData) {
            this._renderHistogram(svg);
        }
    }

    _renderStructureHtml() {
        const container = document.createElement("div");
        container.setAttribute("class", "container");

        const chartContainer = document.createElement("div");
        chartContainer.setAttribute("id", "chart");
        container.append(chartContainer);

        const detailsContainer = document.createElement("div");
        detailsContainer.setAttribute("id", "details");
        container.append(detailsContainer);

        this.shadow.append(container);
    }

    _renderDetailsHtml() {
        const detailsElement = this.shadow.getElementById("details");

        const doughnutDataSum = sumObjectValues(this.doughnutData);
        const detailElements = Object.entries(this.doughnutData).map(([key, value], index) => {
            const detailElement = document.createElement("div");
            detailElement.setAttribute("class", "detail");

            const titleElement = document.createElement("h4");
            titleElement.setAttribute("class", `arc-color-${index}`);
            titleElement.innerText = key;

            const valuesElement = document.createElement("div");
            valuesElement.setAttribute("class", "values");

            const percentage = value / doughnutDataSum * 100;
            const percentageElement = document.createElement("span");
            percentageElement.setAttribute("class", "percentage");
            percentageElement.innerText = `${percentage.toFixed(0)}%`;
            valuesElement.append(percentageElement);

            const formattedValue = this.formatter(value);
            const valueElement = document.createElement("span");
            valueElement.setAttribute("class", "value");
            valueElement.innerText = formattedValue;
            valuesElement.append(valueElement);

            detailElement.append(titleElement, valuesElement);
            return detailElement;
        });

        detailsElement.append(...detailElements);
    }

    _renderBaseSvg() {
        return d3.select(this.shadow.getElementById('chart'))
            .append("svg")
            .attr("width", this.diameter)
            .attr("height", this.diameter)
            .append("g")
            .attr("transform", "translate(" + this.diameter / 2 + "," + this.diameter / 2 + ")");
    }

    _createD3PieArcs() {
        const pie = d3.pie()
            .value(function (d) {
                return d.value;
            });
        if(this.sort === SORT_DESCENDING) {
            pie.sortValues((a, b) => b - a);
        } else if (this.sort === SORT_ASCENDING) {
            pie.sortValues((a, b) => a - b);
        }
        return pie(d3.entries(this.doughnutData));
    }

    _renderSvgArcs(svg, arcs) {
        svg
            .selectAll()
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(this.innerRadius)         // This is the size of the donut hole
                .outerRadius(this.outerRadius)
            )
            .attr('class', (d, i) => `arc-color-${i}`)
    }

    _renderSvgTexts(svg) {
        const texts = svg.append("g");
        texts.append("text").attr("class", "title").attr("dy", "-.5em").html(this.title);

        const total = sumObjectValues(this.doughnutData);
        texts.append("text").attr("class", "total").attr("dy", ".5em").html(this.formatter(total));
    }

    _renderQuarterLines(svg) {
        const middleRadius = this.innerRadius;
        const points = [0, 1, 2, 3].map(i => [
            middleRadius * Math.cos(Math.PI * i / 2),
            middleRadius * Math.sin(Math.PI * i / 2)
        ]);
        const lineLength = this.histogramMargin * 3 / 4;
        const innerPoints = [0, 1, 2, 3].map(i => [
            middleRadius * Math.cos(Math.PI * i / 2) - Math.cos(Math.PI * i / 2) * lineLength,
            middleRadius * Math.sin(Math.PI * i / 2) - Math.sin(Math.PI * i / 2) * lineLength,
        ]);
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const innerPoint = innerPoints[i];
            svg
                .append("line")
                .attr("x1", point[0])
                .attr("y1", point[1])
                .attr("x2", innerPoint[0])
                .attr("y2", innerPoint[1])
                .attr("class", "quarter");
        }
    }

    _renderHistogram(svg) {
        const areaRadius = this.innerRadius - this.histogramMargin;
        const angleLeftStart = Math.PI * 9 / 10;
        const areaLeftStart = [
            areaRadius * Math.cos(angleLeftStart),
            areaRadius * Math.sin(angleLeftStart)
        ];

        const angleRightEnd = Math.PI / 10;
        const areaRightEnd = [
            areaRadius * Math.cos(angleRightEnd),
            areaRadius * Math.sin(angleRightEnd)
        ];

        const x = d3.scaleLinear()
            .domain([0, this.histogramData.length - 1])
            .range([areaLeftStart[0] + this.histogramMargin, areaRightEnd[0] - this.histogramMargin]);

        const y = d3.scaleLinear()
            .domain([d3.min(this.histogramData), d3.max(this.histogramData)])
            .range([areaLeftStart[1] + this.histogramMargin, areaLeftStart[1]]);

        const y1 = (x) => areaRadius * Math.sin(Math.acos(x / areaRadius));

        const area = d3.area()
            .x((d, i) => x(i))
            .y(d => y(d))
            .y1((d, i) => y1(x(i)));

        const line = d3.line()
            .x((d, i) => x(i))
            .y(d => y(d));

        svg.append("path")
            .datum(this.histogramData)
            .attr("d", area)
            .attr("class", "histogram area");

        svg.append("path")
            .datum(this.histogramData)
            .attr("d", line)
            .attr("class", "histogram line")
    }
}

const name = 'marfeel-doughnut-chart';
if(!window.customElements.get(name)) {
    window.customElements.define(name, MarfeelDoughnutGramChart);
}
