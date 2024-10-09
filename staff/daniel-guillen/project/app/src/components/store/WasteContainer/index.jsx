import './index.css'
// img
import grg from '../../img/grg.png'
import palet from '../../img/palet.png'
import bigbag from '../../img/bigbag.png'
import b200 from '../../img/b200.png'
import bm200 from '../../img/bm200.png'

function WasteContainer({ optionsContainer, handleOptionsContainer }) {

  return (
    <div className="WasteContainerDiv">
      <div className={`WasteContainerStatus ${optionsContainer}`}>
        <div className="ContainerOptions">
          <input
            required
            className="radio"
            id="palet"
            type="radio"
            name="wasteContainer"
            value="PALET"
            checked={optionsContainer === "PALET"}
            onChange={handleOptionsContainer}
          />
          <label htmlFor="palet">
            <img className="ImgOptions" src={palet} alt="PALET" />
          </label>

          <input
            required
            className="radio"
            id="grg"
            type="radio"
            name="wasteContainer"
            value="GRG"
            checked={optionsContainer === "GRG"}
            onChange={handleOptionsContainer}
          />
          <label htmlFor="grg">
            <img className="ImgOptions" src={grg} alt="GRG" />
          </label>

          <input
            required
            className="radio"
            id="bigbag"
            type="radio"
            name="wasteContainer"
            value="BIGBAG"
            checked={optionsContainer === "BIGBAG"}
            onChange={handleOptionsContainer}
          />
          <label htmlFor="bigbag">
            <img className="ImgOptions" src={bigbag} alt="BIGBAG" />
          </label>

          <input
            required
            className="radio"
            id="b200"
            type="radio"
            name="wasteContainer"
            value="B200"
            checked={optionsContainer === "B200"}
            onChange={handleOptionsContainer}
          />
          <label htmlFor="b200">
            <img className="ImgOptions" src={b200} alt="B200" />
          </label>

          <input
            required
            className="radio"
            id="b-200"
            type="radio"
            name="wasteContainer"
            value="B-200"
            checked={optionsContainer === "B-200"}
            onChange={handleOptionsContainer}
          />
          <label htmlFor="b-200">
            <img className="ImgOptions" src={bm200} alt="B-200" />
          </label>
        </div>

        <p>
          Residuo acondicionado en: <strong>{optionsContainer}</strong>
        </p>
      </div>
    </div>
  )
}

export default WasteContainer
