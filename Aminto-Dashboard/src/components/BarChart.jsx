import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import Common from '../common/Common'
export default function BarChart() {

    const [data, setData] = useState([])
    const [xlabel, setXlabel] = useState([])
    async function getData(){
        const GetRequest = async () => {
        const res = await fetch('//API')
        const json = await res.json();
        console.log(json)
        setData(json['Feature']);
        setXlabel(json['Importance'])
        }
    }
    useEffect(()=>{
        getData()
    },[])
    const bardata = {
        series: [
            {
                name: "Net Profit",
                data: [...data],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
                // add this by typing
                foreColor: "grey",
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "25%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                foreColor: "#fff",
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
            },
            fill: {
                opacity: 1,
            },
            // remove  it tooltip
            grid: {
                show: false,
            },
            xaxis: {
                categories: [...xlabel],
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: true,
                },
            },
            yaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    show: true,
                },
            },
        },
    }
    if(data.length==0)
    return <p>Loading...</p>
    return (
        <>
            <section className='charts'>
                <div className='cardBox'>
                    <Common title='Statistics' />
                    <ReactApexChart options={bardata.options} series={bardata.series} type='bar' height={350} />
                </div>
            </section>
        </>
    )
}