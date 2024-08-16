import React from 'react';
import Title from '../core/Title';
import './CreateRoom.css';

const CreateRoomInfo = ({ onClick }) => (
  <div>
    <div className="information-section">
      <Title className='TitleInfo'><strong>Información Importante</strong></Title>
      {/* TODO me puedo ahorrar esta info con un alert */}
      <div>
        <p>
          Por favor, antes de comenzar, asegúrese de leer cuidadosamente las instrucciones proporcionadas a continuación para que toda la información sea precisa y esté actualizada.
        </p>
      </div>
      <div>
        <div className='instructions-content'>
          <h3 className='instructions-heading'>1. Nombre de la Habitación</h3>
          <p>
            En el campo “Nombre de la habitación”, debes ingresar un nombre descriptivo y atractivo para tu oferta de habitación. Algunos ejemplos pueden ser:
          </p>
          <ul className='instructions-list'>
            <li>Apartamento Familiar</li>
            <li>Habitación Doble</li>
            <li>Habitación Suite</li>
          </ul>

          <h3 className='instructions-heading'>2. Región</h3>
          <p>
            Para determinar la región a la que pertenece tu habitación, puedes guiarte por la siguiente división de regiones:
          </p>
          <ul className='instructions-list'>
            <li><strong>Región Norte:</strong> Distrito Capital, La Guaira, Miranda, Aragua, Carabobo, Zulia, Falcón, Yaracuy, Dependencias Federales (Los Roques, La Orchila, Isla La Tortuga, y otras islas menores).</li>
            <li><strong>Región Sur:</strong> Bolívar, Amazonas, Apure.</li>
            <li><strong>Región Este:</strong> Anzoátegui, Monagas, Sucre, Nueva Esparta, Delta Amacuro, Dependencias Federales (Isla de Aves).</li>
            <li><strong>Región Oeste:</strong> Táchira, Mérida, Trujillo, Barinas, Lara, Portuguesa, Cojedes, Guárico.</li>
          </ul>

          <h3 className='instructions-heading'>3. Ciudad</h3>
          <p>
            Para determinar la ubicación en la cual se localiza tu habitación, debes ingresar el nombre del estado y la ciudad:
          </p>
          <ul className='instructions-list'>
            <li>Anzoátegui, Puerto La Cruz.</li>
            <li>Bolívar, Ciudad Bolívar</li>
            <li>Nueva Esparta, El Valle</li>
          </ul>

          <h3 className='instructions-heading'>4. Imagen (Link)</h3>
          <p>
            Debes proporcionar un enlace a una imagen en formato JPG que comience con “http”. Por ejemplo:
          </p>
          <ul className='instructions-list'>
            <li>http://example.com/imagen1.jpg</li>
          </ul>

          <h3 className='instructions-heading'>5. Descripción</h3>
          <p>
            Aquí debes resumir las características principales de la habitación y los servicios que ofreces Ejemplos:
          </p>
          <ul className='instructions-list'>
            <li>Habitación con cama doble para máximo 2 personas, wifi, A/C baño, balcón y cocina.</li>
            <li>Habitación con 2 literas para máximo 4 personas, sin baño, acesso a piscina y playa privada.</li>
          </ul>

          <h3 className='instructions-heading'>6. Precio por Noche</h3>
          <p>
            Indica el precio por noche junto con la moneda. Ejemplos:
          </p>
          <ul className='instructions-list'>
            <li>45 USD</li>
            <li>32 EUR</li>
            <li>20409 VES</li>
          </ul>

        </div>
        <button className="show-form-button" onClick={onClick}>
          Ir al Formulario
        </button>
      </div>
    </div>
  </div >
);

export default CreateRoomInfo;

//TODO que La informacion importante sea un alert!