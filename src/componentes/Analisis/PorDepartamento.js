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

export const PorDepartamento = () => {

    const people = useSelector(state => state.people.peoples);
    const countrys = useSelector(state => state.country.countrys);

    useEffect(() => {
        console.log(countrys);
    }, [countrys]);

    const cityNames = countrys.map(city => city.nombre);
    const peopleCounts = countrys.map(city => {
        const cityPeople = people.filter(person => person.departamento === city.id);
        return cityPeople.length;
    });

    return (
        <div>
            <Bar options={options} data={{
                labels: cityNames,
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

export default PorDepartamento;