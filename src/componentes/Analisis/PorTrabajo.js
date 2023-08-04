import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Censo por ciudad',
        },
    },
};

export const PorTrabajo = () => {

    const people = useSelector(state => state.people.peoples);
    const jobs = useSelector(state => state.job.jobs);

    const jobsNames = jobs.map(job => job.ocupacion);
    const peopleCounts = jobs.map(job => {
        const cityPeople = people.filter(person => person.ocupacion === job.id);
        return cityPeople.length;
    });

    return (
        <div>
            <Bar options={options} data={{
                labels: jobsNames,
                datasets: [
                    {
                        label: 'Personas',
                        data: peopleCounts,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }} />
        </div>
    )
}

export default PorTrabajo;