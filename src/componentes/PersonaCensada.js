import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { addPeople } from "../features/peopleSlice";

export const PersonaCensada = () => {

  const dispatch = useDispatch();
  const [peopleNew, setPeopleNew] = useState([]);

  const apiKey = localStorage.getItem('session');
  const id = localStorage.getItem('id');

  const countrys = useSelector(state => state.country.countrys);
  const citys = useSelector(state => state.city.citys);
  const jobs = useSelector(state => state.job.jobs);
  const people = useSelector(state => state.people.peoples);

  const nameRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const dateRef = useRef();
  const jobRef = useRef();


  const [idDepartamento, setIdDepartamento] = useState(0);
  const [filteredCities, setFilteredCities] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedOccupation, setSelectedOccupation] = useState("");

  useEffect(() => {
    const filteredCities = citys.filter(city => city.idDepartamento === idDepartamento);
    setFilteredCities(filteredCities);
  }, [idDepartamento, citys]);


  useEffect(() => {
    setPeopleNew(people) 
  }, [people]);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
    const age = calculateAge(event.target.value);
    setSelectedOccupation(age >= 18 ? "" : "Estudiante");
  };

  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value);
  };

  const departamentCambio = (event) => {
    const selectedDepartmentId = parseInt(event.target.value);
    setIdDepartamento(selectedDepartmentId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Obtener los valores del formulario usando useRef
    const name = nameRef.current.value;
    const date = dateRef.current.value;
    const job = jobRef.current.value;
    const city = cityRef.current.value;
    const country = countryRef.current.value;

    let objPeople = {
      idUsuario: id,
      nombre: name,
      departamento: +country,
      ciudad: +city,
      fechaNacimiento: date,
      ocupacion: +job
    };

    fetch("https://censo.develotion.com/personas.php", {
      method: "POST",
      body: JSON.stringify(objPeople),
      headers: {
        "Content-type": "application/json",
        'apikey':apiKey,
        'iduser':id
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.codigo ===200){
          console.log(json)
          toast.success(`${json.mensaje}`)
          dispatch(addPeople({ id: json.idCenso,...objPeople}));

        }else{
          toast.error(`${json.mensaje}`)
        }
      });

    // Limpiar el formulario después del envío
    nameRef.current.value='';
    dateRef.current.value='';
    jobRef.current.value='';
    cityRef.current.value='';
    countryRef.current.value='';

  };
  return (
    <div id='contenedorCensada'>
      <h2 className="active"> Agrega a una persona </h2>
      <form className='addPerson' onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Nombre"
          ref={nameRef}
        />
        <select required onChange={departamentCambio} ref={countryRef}>
          <option disabled value="" selected>Seleccione un departamento</option>
          {countrys.map(cout => <option key={cout.id} value={cout.id}>{cout.nombre}</option>)}
        </select>
        <select required ref={cityRef}>
          <option disabled value="" selected>Selecciona una ciudad</option>
          {filteredCities.map(city => (
            <option key={city.id} value={city.id}>{city.nombre}</option>
          ))}
        </select>
        <input
          required
          type="date"
          placeholder="Fecha nacimiento"
          onChange={handleDateOfBirthChange}
          ref={dateRef}
        />
        <select required value={selectedOccupation} onChange={handleOccupationChange} ref={jobRef}>
          <option disabled value="" selected>Selecciona la ocupacion</option>
          {jobs.map(job => (
            <option
              key={job.id}
              value={job.id}
              disabled={calculateAge(dateOfBirth) < 18 && job.ocupacion !== "Estudiante"}
            >
              {job.ocupacion}
            </option>
          ))}
        </select>
        <input type="submit" value="Register" />
      </form>
      <Toaster />

    </div>
  );
}





