import CheckList from '../CheckList'
import { small, medium, big } from './inspectiondata'
import { useEffect } from 'react'

const InspectionSections = ({ size, handleRadioChange, checkList, setCheckList }) => {

  const getData = (size) => {
    switch (size) {
      case 'small':
        return { data: small }
      case 'medium':
        return { data: medium }
      case 'big':
        return { data: big }
      default:
        return { data: [] }
    }
  }

  const { data } = getData(size)

  useEffect(() => {
    if (data.length > 0) {
      const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
      setCheckList(initializedData)
    }
  }, [data, setCheckList])

  const sections = [
    { title: 'LUCES', items: checkList.filter(item => item.apartado === 'LUCES') },
    { title: 'CHASIS / CARROCERÍA', items: checkList.filter(item => item.apartado === 'CHASIS' || item.apartado === 'CARROCERÍA') },
    { title: 'MOTOR', items: checkList.filter(item => item.apartado === 'MOTOR') },
    { title: 'NEUMÁTICOS', items: checkList.filter(item => item.apartado === 'NEUMÁTICOS') },
    { title: 'FRENOS / DIRECCIÓN', items: checkList.filter(item => item.apartado === 'FRENOS' || item.apartado === 'DIRECCIÓN') },
    { title: 'ACCESORIOS', items: checkList.filter(item => item.apartado === 'ACCESORIOS') },
    { title: 'MATERIAL', items: checkList.filter(item => item.apartado === 'MATERIAL') },
    { title: 'ADR', items: checkList.filter(item => item.apartado === 'ADR') },
    { title: 'EPIS', items: checkList.filter(item => item.apartado === 'EPIS') },
  ]

  return (
    <>
      {sections.map(section => (
        <CheckList
          key={section.title}
          title={section.title}
          items={section.items}
          handleRadioChange={handleRadioChange}
        />
      ))}
    </>
  )
}

export default InspectionSections