import React, {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line, Bar} from "react-chartjs-2";

import styles from './Chart.module.css';




const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());

        }
        


        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length != 0
            ? (
                <Line
                data = {{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Zakażenia',                     
                        borderColor: 'rgba(0,0,255,0.9)',
                        fill: true,
                     
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Zgony',
                        borderColor: 'red',
                        fill: true,
                    }],

                }}

            />) : null 
     );



    const barChar = (
        confirmed
        ? (
            <Bar
                data = {{
                    labels: ["Zakażenia", "Wyleczenia", "Zgony"],
                    datasets: [{
                        label: "Liczba osób",
                        backgroundColor: [
                            'rgba(0,0,255,0.9)',
                            'rgba(0,255,0,0.9)',
                            'rgba(255,0,0,0.9)',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]

                    }]

                }}
                options = {{
                    legend: {display: false},
                    title: {display: true, text: `Aktualny stan w ${country}`}
                }}
            />

        ):null

    );


    return (
        <div className = {styles.container}>
            {country ? barChar : lineChart
            }
        </div>
    )
}
        


export default Chart