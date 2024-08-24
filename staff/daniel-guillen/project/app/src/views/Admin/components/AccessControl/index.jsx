import React from 'react'
import './index.css'
import Label from '../../../../components/core/Label'
import Input from '../../../../components/core/Input'

const AccessControl = ({ access, handleAccessChange }) => {
  return (
    <div className='AccessOptions'>
      <h3>Control de Acceso</h3>

      <div className='AccessOptions1'>
        <h4>INVENTARIO</h4>
        <Label>
          <Input
            className="Lock"
            type="checkbox"
            name="stored"
            checked={access.stored === 'TRUE'}
            onChange={handleAccessChange}
          />🔓
        </Label>
      </div>
      <div className='AccessOptions1'>
        <h4>SALIDAS</h4>
        <Label>
          <Input
            className="Lock"
            type="checkbox"
            name="truckLoad"
            checked={access.truckLoad === 'TRUE'}
            onChange={handleAccessChange}
          />🔓
        </Label>
      </div>

      <div className='AccessOptions1'>
        <h4>VEHICULOS</h4>
        <Label>
          <Input
            className="Lock"
            type="checkbox"
            name="vehicles"
            checked={access.vehicles === 'TRUE'}
            onChange={handleAccessChange}
          />🔓
        </Label>
      </div>
      <div className='AccessOptions1'>
        <h4>ADMIN</h4>
        <Label>
          <Input
            className="Lock"
            type="checkbox"
            name="admin"
            checked={access.admin === 'TRUE'}
            onChange={handleAccessChange}
          />🔓
        </Label>
      </div>
    </div>
  )
}

export default AccessControl