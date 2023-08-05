import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Porcentaje = () => {
  const people = useSelector(state => state.people.peoples);
  const [userPercentage, setUserPercentage] = useState(0); // State for user's percentage

  const apiKey = localStorage.getItem("session");
  const id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`https://censo.develotion.com/totalCensados.php`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const userCensados = people.length;
        const percentage = (userCensados / json.total) * 100;
        setUserPercentage(percentage);
      });
  })
  return (
    <div className="card" style={{ height: "400px", width: "100%" }} >
      <Doughnut
className="d-grid col-10 mx-auto"
        data={{
          responsive: true,
          labels: ["Censados por el usuario", "Resto de censados"],
          datasets: [
            {
              label: "% de censados",
              data: [userPercentage, 100 - userPercentage],
              backgroundColor: [
                "rgba(255, 99, 132)",
                "rgba(54, 162, 235)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default Porcentaje
