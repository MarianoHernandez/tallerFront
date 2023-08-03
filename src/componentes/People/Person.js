import React from "react";
import { Link } from "react-router-dom";

export const Person = ({nombre,job,fechaNacimiento}) => {
  return (
    
    <div class="card">
        <h3 class="card__title">{nombre}
        </h3>
        <p class="card__content">{job}</p>
        <div class="card__date">
            {fechaNacimiento}
        </div>
        <div class="card__arrow">
            <Link>Borrar</Link>
        </div>
    </div>
    
  );
};
