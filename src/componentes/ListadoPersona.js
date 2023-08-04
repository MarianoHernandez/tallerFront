import React, { useEffect, useState } from "react";
import { Person } from "./People/Person";
import { useSelector } from "react-redux";

export const ListadoPersona = () => {
  const people = useSelector((state) => state.people.peoples);
  const jobs = useSelector((state) => state.job.jobs);
  const [job, setJob] = useState("todos");
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    if (job === "todos") {
      setFilteredPeople(people);
    } else {
      const filteredPeople = people.filter((j) => j.ocupacion === +job);
      setFilteredPeople(filteredPeople);
    }
  }, [job,people]);

  const handleSelect = (event) => {
    setJob(event.target.value);
  };
  return (
    <>
      <div className="allCards">
        <div>
          <select onChange={handleSelect}>
            <option selected value="todos">
              Mostrar todos
            </option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.ocupacion}
              </option>
            ))}
          </select>
        </div>
        <h1>Todas las personas contenedor</h1>
        <div>
          {filteredPeople.map((person) => {
            return <Person key={person.id} {...person}></Person>;
          })}
        </div>
      </div>
    </>
  );
};
