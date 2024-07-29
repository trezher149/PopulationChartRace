// import * as d3 from "d3";
import { useState, useEffect } from "react";
import YearTimeline from "./YearTimeline";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts"
import PlayAndSelectButton from "./Buttons";

function dataSetMapping(year, data) {
    var dataset = []
    data[year].map((value, key) => {
        dataset.push([value.Country.country_name, value.population])
    })
    return dataset
}
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


function PopChart() {
    const [populationData, setData] = useState([])
    const [demographicType, setDemographicType] = useState("Population")
    const [year, updateYear] = useState(1950)
    const [isLoading, setIsLoading] = useState(false)
    const [chartOptions, setChartOptions] = useState({
        title: {
            text: "",
            align: "left",
            x: 24
            },
        chart: {
            height: 620
        },
        legend: { enabled: false},
        xAxis: { type: "category" },
        yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            title: { text: null }
        },
        plotOptions: {
            series: {
                type: "bar",
                colorByPoint: true,
                dataLabels: {
                    enabled: true
                },
                dataSorting: {
                    enabled: true,
                    matchByName: true
                },
                lineWidth: 10
            }
        },
        series: [{
            type: "bar",
            data: populationData,
            pointWidth: 36
        }]
    })

    function initData() {
        setIsLoading(true)
        fetch(`http://localhost:7000/api/v1/country/population?demographicType=${0}`)
        .then(
            (res) => {
                return res.json()
            }
        )
        .then((data)=> {
            const mappedData = dataSetMapping(1950, data)
            setChartOptions({
                title: { text: demographicType},
                series: [{data: mappedData}]
            })
            setData(data)
            setIsLoading(false)
        })
    }

    useEffect(initData, [])


    function LoadingStatusComponent() {
        if (isLoading) {
            return <p className="my-auto mx-4">Loading...</p>
        }
    }

    function chartUpdateOnce(setYear) {
        setChartOptions({
            title: {text: demographicType},
            series: [{data: dataSetMapping(setYear, populationData)}]
        })
    }

    return (
        <>
            <div className="grid grid-flow-col place-content-start gap-2">
                <PlayAndSelectButton setIsLoading={setIsLoading}
                setData={setData} dataMapping={dataSetMapping}
                getDemographicType={setDemographicType}
                updateChart={setChartOptions}
                populationData={populationData}
                updateTimeline={updateYear}
                year={year}
                />
                <LoadingStatusComponent/>
            </div>
            <div className="m-4 mx-52 p-8 bg-white rounded-lg drop-shadow-lg">
                <h1 className="font-extrabold text-2xl">Year {year}</h1>
                <YearTimeline year={year} updateYear={updateYear} updateChart={chartUpdateOnce} />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </>
    )
}

export default PopChart