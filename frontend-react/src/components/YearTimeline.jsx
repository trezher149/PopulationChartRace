import 'react-range-slider-input/dist/style.css';
import * as d3 from 'd3'
// import './SliderStyle.css';
import { useRef, createRef, useState } from 'react';


function YearTimeline({
    year,
    updateYear,
    updateChart
}) {
    // let yearList = []
    // for(let i = 1950; i <= 2021; i += 10) {
    //     yearList.push(i)
    // }
    // const [sliderYear, setSliderYear] = useState(year)
    const svgRef = useRef()
    const svg = d3.select(svgRef.current)
    const xScale = d3.scaleLinear().domain([1950, 2021]).range([0, 1320]).clamp(true)
    const axis = d3.axisBottom(xScale)
    const gx = svg.append("g")
    .attr("width", "full")
    .call(axis);
    // svg.select(".axis")
    // .call(axis)

    function input() {
        console.log("Called!")
    }

   return (
    <div className='w-full'>
        {/* <RangeSlider 
        className="single-thumb"
        min={1950}
        max={2021}
        defaultValue={[1950,1950]}
        value={[0, year]}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
        onThumbDragEnd={input}
        /> */}
        <input type="range" min={"1950"} max={"2021"} step={1} value={year}
        onChange={(e) => {
            // setSliderYear(e.target.value)
            updateChart(e.target.value)
            updateYear(e.target.value)
        }}
        onTouchEnd={() => input}
        className='w-full' 
        >
        </input>
        <svg ref={svgRef} className='w-full mx-auto h-12'>
            {/* <g className='axis' ref={gx}></g> */}
        </svg>
    </div>
   )
}

export default YearTimeline