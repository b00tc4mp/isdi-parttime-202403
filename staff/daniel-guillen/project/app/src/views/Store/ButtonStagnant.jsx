import React, { useState } from "react"

const ButtonStagnant = () => {

  const [stagnant, setStagnant] = useState('true')
  console.log("Opcion elegida:", stagnant)

  const toggleSwitch = () => {
    setStagnant((prevStagnant) => !prevStagnant);
  };

  return (
    <div className="ButtonStagnant">
        <h2 className='StagnantTitle'>Estado del residuo:</h2>
        <button
        className={`SwitchStagnant ${stagnant ? "true" : "false"}`}
        onClick={toggleSwitch}
        >
        <h2>{stagnant ? "Bien atendido" : "Estancado"}</h2>
      </button>
    </div>
  );
};

export default ButtonStagnant