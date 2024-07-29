import { useState } from "react"
import playButtonIcon from "./buttonIcons/play-button.png"
import pauseButtonIcon from "./buttonIcons/pause-button.png"
import fastForwardIcon from "./buttonIcons/fast-forward.png"
import DropDownButton from "./DropDownButtons"

function PlayAndSelectButton({
    setIsLoading,
    setData,
    dataMapping,
    getDemographicType,
    updateChart,
    populationData,
    updateTimeline,
    year
}) {
    const options = [
        "Population",
        "Population of children under the age of 1",
        "Population of children under the age of 5",
        "Population of children under the age of 15",
        "Population under the age of 25",
        "Population aged 15 to 64 years",
        "Population older than 15 years",
        "Population older than 18 years",
        "Population at age 1",
        "Population aged 1 to 4 years",
        "Population aged 5 to 9 years",
        "Population aged 10 to 14 years",
        "Population aged 15 to 19 years",
        "Population aged 20 to 29 years",
        "Population aged 30 to 39 years",
        "Population aged 40 to 49 years",
        "Population aged 50 to 59 years",
        "Population aged 60 to 69 years",
        "Population aged 70 to 79 years",
        "Population aged 80 to 89 years",
        "Population aged 90 to 99 years",
        "Population older than 100 years"
    ]

    const [isPlaying, setPlay] = useState(false)
    const [isOptionOpened, setOpenOption] = useState(false)
    const [optionSelected, selectingOption] = useState(0)
    const [intervalFunc, setIntervalFunc] = useState(undefined)
    const [currYear, updateCurrYear] = useState(1950)
    
    function clickPlay() {
        if (!isPlaying) {
            // var intervalYear = currYear
            var intervalYear = year
            console.log("Playing...")
            const setInter = setInterval(() => {
                if (intervalYear > 2021) {
                    setPlay(false)
                    console.log(intervalFunc)
                    clearTimeout(setInter)
                    setIntervalFunc(undefined)
                    // updateYear(intervalYear - 1)
                    console.log("Paused")
                }
                else {
                    updateChart({
                        series: [{data: dataMapping(intervalYear, populationData)}]
                    })
                    // updateYear(intervalYear)
                    updateTimeline(intervalYear)
                    intervalYear++
                }
            }, 500)
            setIntervalFunc(setInter)
            setPlay(true)
        }
        else {
            clearTimeout(intervalFunc)
            setIntervalFunc(undefined)
            setPlay(false)
        }
    }

    function PlayButton() {
        const size = 64
        if(isPlaying) {return <img width={size} height={size} src={pauseButtonIcon}/>}
        else {return <img width={size} height={size} src={playButtonIcon}/>}
    }

    function forwardStepTenYears() {

    }

    function ForwardButton() {
        const size = 24 
        // if(isPlaying) {return <img width={size} height={size} src={pauseButtonIcon}/>}
        // else {return <img width={size} height={size} src={playButtonIcon}/>}
        return (
            <button type="button" onClick={clickPlay}
            className="min-w-8 min-h-8 my-auto
            p-4 bg-blue-200 shadow-xl rounded-full
            active:bg-blue-500
            "
            >
                <img width={size} height={size} src={fastForwardIcon}/>
            </button>
        )
    }

    function PlayStatus() {
        const className = "my-auto font-extrabold text-center text-lg"
        if(!isPlaying) {return <p className={className}>Paused</p>}
        else {return <p className={className}>Playing</p>}
    }

    function openOptions() {
        setOpenOption(!isOptionOpened)
    }

    function selectOption(value) {
        selectingOption(value)
        setOpenOption(!isOptionOpened)
        getDemographicType(options[value])
    }


    function fetchData(demographicType) {
        setIsLoading(true)
        fetch(`http://localhost:7000/api/v1/country/population?demographicType=${demographicType}`)
        .then(
            (res) => {
                return res.json()
            }
        )
        .then((data)=> {
            // getDemographicType(demographicType)
            updateChart({
                title: {text: options[demographicType]},
                series: [{data: dataMapping(1950, data)}]
            })
            updateTimeline(1950)
            setData(data)
            setIsLoading(false)
        })
    }

    function Options({openOption, fetchData, setYear}) {
        if (isOptionOpened) {
            var value = 0
            return options.map((option)=> {
                var isSelected = false
                if (value == optionSelected) isSelected = true
                value++
                return <DropDownButton
                    key={value} name={option}
                    value={value - 1} openOption={openOption}
                    fetchData={fetchData} isSelected={isSelected}
                    setYear={setYear}
                />
            })
        }

    }
    return (
        <div className="mx-52 grid grid-flow-col place-content-start gap-4">
            <button type="button" onClick={clickPlay}
            className="min-w-8 min-h-8 my-auto
            p-2 bg-white shadow-xl rounded-full
            active:bg-gray-300
            "
            >
                <PlayButton/>
            </button>
            <ForwardButton/>
            <PlayStatus/>
            <div className="my-auto">
                <button onClick={openOptions}
                className="
                p-4 bg-blue-600 text-white font-bold shadow-md rounded-md 
                active:bg-blue-800 active:text-gray-400
                "
                >
                    Select demography 
                    <img src=""></img>
                </button>
                <div className="absolute grid grid-flow-row overflow-scroll max-h-56 max-w-80 z-10 bg-blue-300 drop-shadow-md rounded-md">
                    <Options fetchData={fetchData} openOption={selectOption} setYear={updateTimeline}/>
                </div>
            </div>
        </div>
    )

}

export default PlayAndSelectButton