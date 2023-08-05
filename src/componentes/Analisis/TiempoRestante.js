import React, { useState, useEffect } from 'react';

const CuentaRegresiva = () => {
  const fechaFinCenso = new Date('2023-08-31');
  const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0 });

  useEffect(() => {
    const calcularTiempoRestante = () => {
      const ahora = new Date();
      const diferenciaTiempo = fechaFinCenso - ahora;

      const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenciaTiempo % (1000 * 60 * 60)) / (1000 * 60));

      setTiempoRestante({ dias, horas, minutos });
    };

    const temporizador = setInterval(calcularTiempoRestante, 1000);

    calcularTiempoRestante();

    return () => clearInterval(temporizador);
  }, []);

  return (
    <div className="d-grid col-8 mx-auto">
      <div className="card text-center mt-3">
        Tiempo restante para el final del censo:<br/> 
        {tiempoRestante.dias} días, {tiempoRestante.horas} horas y {tiempoRestante.minutos} minutos
      </div>
    </div>

  );
};

export default CuentaRegresiva;