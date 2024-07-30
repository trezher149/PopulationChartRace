function YearTimeline({
    year,
    updateYear,
    updateChart
}) {
    function input() {
        console.log("Called!")
    }

   return (
    <div className='w-full'>
        <input type="range" min={"1950"} max={"2021"} step={1} value={year}
        onChange={(e) => {
            updateChart(e.target.value)
            updateYear(parseInt(e.target.value))
        }}
        onTouchEnd={() => input}
        className='w-full' 
        >
        </input>
    </div>
   )
}

export default YearTimeline