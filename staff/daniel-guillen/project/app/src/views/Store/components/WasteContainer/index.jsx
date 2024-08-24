import React from 'react'
import './index.css'
//img
import grg from '../../../../components/img/grg.png'
import palet from '../../../../components/img/palet.png'
import bigbag from '../../../../components/img/bigbag.png'
import b200 from '../../../../components/img/b200.png'
import bm200 from '../../../../components/img/bm200.png'

function WasteContainer( { optionsContainer, handleOptionsContainer }) {

  return (
    <div className="WasteContainerDiv">
      <div className={`WasteContainerStatus ${optionsContainer}`}>
        
        <div className="ContainerOptions">
        
          <input required
            className='Radio'
            id="palet"
            type="radio"
            name="wasteContainer"
            value="PALET"
            checked={optionsContainer === "PALET"}
            onChange={handleOptionsContainer}
          />
            <label htmlFor="palet"><img className="ImgOptions" src={palet} /></label>

          <input required
            className='Radio'
            id="grg"
            type="radio"
            name="wasteContainer"
            value="GRG"
            checked={optionsContainer === "GRG"}
            onChange={handleOptionsContainer}
          />
            <label htmlFor="grg"><img className="ImgOptions" src={grg} /></label>

          <input required
            className='Radio'
            id="bigbag"
            type="radio"
            name="wasteContainer"
            value="BIGBAG"
            checked={optionsContainer === "BIGBAG"}
            onChange={handleOptionsContainer}
          />
            <label htmlFor="bigbag"><img className="ImgOptions" src={bigbag} /></label>

          <input required
            className='Radio'
            id="b200"
            type="radio"
            name="wasteContainer"
            value="B200"
            checked={optionsContainer === "B200"}
            onChange={handleOptionsContainer}
          />
            <label htmlFor="b200"><img className="ImgOptions" src={b200} /></label>

          <input required
            className='Radio'
            id="b-200"
            type="radio"
            name="wasteContainer"
            value="B-200"
            checked={optionsContainer === "B-200"}
            onChange={handleOptionsContainer}
          />
            <label htmlFor="b-200"><img className="ImgOptions" src={bm200} /></label>
          
        </div>
      
          <p>
          Residuo acondicionado en:<strong>{optionsContainer}</strong>
          </p>
      
      </div>

    </div>
  )
}

export default WasteContainer