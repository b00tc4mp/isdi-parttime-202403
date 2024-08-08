import React from "react"
import './index.css'
import grg from './grg.png'
import palet from './palet.png'
import bigbag from './bigbag.png'
import b200 from './b200.png'
import bm200 from './bm200.png'

function WasteContainer( { optionsContainer, handleOptionsContainer }) {

  return (
    <div className="WasteContainerDiv">
      <div className={`WasteContainerStatus ${optionsContainer}`}>
        <div className="ContainerOptions">
        <input required className='Radio'
          type="radio"
          name="wasteContainer"
          value="GRG"
          id="grg"
          checked={optionsContainer === "GRG"}
          onChange={handleOptionsContainer}
        />
        <label htmlFor="grg"><img className="Img" src={grg} /></label>

        <input className='Radio'
          type="radio"
          name="wasteContainer"
          value="PALET"
          id="palet"
          checked={optionsContainer === "PALET"}
          onChange={handleOptionsContainer}
        />
        <label htmlFor="palet"><img className="Img" src={palet} /></label>

        <input className='Radio'
          type="radio"
          name="wasteContainer"
          value="BIGBAG"
          id="bigbag"
          checked={optionsContainer === "BIGBAG"}
          onChange={handleOptionsContainer}
        />
        <label htmlFor="bigbag"><img className="Img" src={bigbag} /></label>

        <input className='Radio'
          type="radio"
          name="wasteContainer"
          value="B200"
          id="b200"
          checked={optionsContainer === "B200"}
          onChange={handleOptionsContainer}
        />
        <label htmlFor="b200"><img className="Img" src={b200} /></label>

        <input className='Radio'
          type="radio"
          name="wasteContainer"
          value="B-200"
          id="b-200"
          checked={optionsContainer === "B-200"}
          onChange={handleOptionsContainer}
        />
        <label htmlFor="b-200"><img className="Img" src={bm200} /></label>
        </div>
        <p>
          Residuo acondicionado en:<strong>{optionsContainer}</strong>
          </p>
      </div>
    </div>
  )
}

export default WasteContainer