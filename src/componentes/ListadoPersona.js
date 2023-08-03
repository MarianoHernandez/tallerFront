import React , { useEffect } from 'react'
import { Person } from './People/Person'
import { useDispatch, useSelector } from "react-redux";
import { savepeople } from "../features/peopleSlice";

export const ListadoPersona = () => {

  const dispatch = useDispatch();
  const apiKey = localStorage.getItem('session');
  const id = localStorage.getItem('id');
  const people = useSelector(state => state.people.peoples);

  const getPeople = () => {
    const url = 'https://censo.develotion.com/personas.php?idUsuario='+`${id}`
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'apikey':apiKey,
          'iduser':id
      },
  })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savepeople(json.personas))
      });
  }

  useEffect(() => {
    getPeople();
    console.log(people)
}, [])

  return (
    <div className='allCards'>
      <h1>Todas las personas contenedor</h1>
      <div>
        
      {people.map(person => {
        return <Person {...person}></Person>
      })}
            </div>

    </div>
  )
}
