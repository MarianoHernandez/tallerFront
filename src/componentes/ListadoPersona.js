import React, { useEffect, useState } from "react";
import { Person } from "./People/Person";
import { useDispatch, useSelector } from "react-redux";
import { savepeople } from "../features/peopleSlice";

export const ListadoPersona = () => {
  const dispatch = useDispatch();
  const apiKey = localStorage.getItem("session");
  const id = localStorage.getItem("id");
  const people = useSelector((state) => state.people.peoples);
  const jobs = useSelector(state => state.job.jobs);
  const [job, setJob] = useState('todos');
  const [filteredPeople, setFilteredPeople] = useState([]);

  const getPeople = () => {
    const url =
    `https://censo.develotion.com/personas.php?idUsuario=${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savepeople(json.personas));
      });
  };

  useEffect(() => {
    console.log(people)
    if(job === 'todos'){
      setFilteredPeople(people)
    }else{
      const filteredPeople = people.filter(j => j.ocupacion === +job);
      setFilteredPeople(filteredPeople);
    }

  }, [job]);

  useEffect(() => {
    //getPeople();
  }, []);
  const handleSelect = (event) =>{
    setJob(event.target.value);
  }
  return (
    <>
      <div className="allCards">
        <div>
          <select onChange={handleSelect}>
            <option selected value='todos'>Mostrar todos</option>
          {jobs.map(job => (
            <option
              key={job.id}
              value={job.id}
            >
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
