import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addPeople } from "../features/peopleSlice";
import { useNavigate } from "react-router-dom";

export const PersonaCensada = () => {

  const dispatch = useDispatch();
  const window = useNavigate();

  const apiKey = localStorage.getItem("session");
  const id = localStorage.getItem("id");

  const countrys = useSelector((state) => state.country.countrys);
  const citys = useSelector((state) => state.city.citys);
  const jobs = useSelector((state) => state.job.jobs);

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
    if (localStorage.getItem("session") === null) {
      window("/");
    }
  });

  useEffect(() => {
    const filteredCities = citys.filter(
      (city) => city.idDepartamento === idDepartamento
    );
    setFilteredCities(filteredCities);
  }, [idDepartamento, citys]);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
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
      ocupacion: +job,
    };

    fetch("https://censo.develotion.com/personas.php", {
      method: "POST",
      body: JSON.stringify(objPeople),
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.codigo === 200) {
          toast.success(`${json.mensaje}`);
          dispatch(addPeople({ id: json.idCenso, ...objPeople }));
        } else {
          toast.error(`${json.mensaje}`);
        }
      });

    // Limpiar el formulario después del envío
    nameRef.current.value = "";
    dateRef.current.value = "";
    jobRef.current.value = "";
    cityRef.current.value = "";
    countryRef.current.value = "";
  };
  return (
    <div className="contenedor mt-5">
      <div className="card text-center d-grid col-10 mx-auto">
        <h2 className="active mb-5"> Agrega a una persona </h2>
        <form className="d-grid col-6 mx-auto text-center" onSubmit={handleSubmit}>
          <input 
            required 
            type="text" 
            placeholder="Nombre" 
            ref={nameRef}
            className="input-group form-control mb-3"
          />
          <select 
            required 
            onChange={departamentCambio} 
            ref={countryRef}
            className="form-select mb-3"
            >
            <option disabled value="" selected>
              Seleccione un departamento
            </option>
            {countrys.map((cout) => (
              <option key={cout.id} value={cout.id}>
                {cout.nombre}
              </option>
            ))}
          </select>
          <select 
            required 
            ref={cityRef}
            className="form-select mb-3"
            >
            <option disabled value="" selected>
              Selecciona una ciudad
            </option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nombre}
              </option>
            ))}
          </select>
          <input
            required
            type="date"
            placeholder="Fecha nacimiento"
            onChange={handleDateOfBirthChange}
            ref={dateRef}
            className="input-group form-control mb-3"
          />
          <select
            required
            value={selectedOccupation}
            onChange={handleOccupationChange}
            ref={jobRef}
            className="form-select mb-3"
          >
            <option disabled value="" selected>
              Selecciona la ocupacion
            </option>
            {jobs.map((job) => (
              <option
                key={job.id}
                value={job.id}
                disabled={
                  calculateAge(dateOfBirth) < 18 && job.ocupacion !== "Estudiante"
                }
              >
                {job.ocupacion}
              </option>
            ))}
          </select>
          <input 
          type="submit" 
          value="Register"
          className="btn btn-success" 
          />
        </form>
        <Toaster />
      </div>
    </div>

  );
};
