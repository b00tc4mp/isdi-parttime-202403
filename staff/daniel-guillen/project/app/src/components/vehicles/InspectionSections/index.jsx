import CheckList from '../CheckList'

const InspectionSections = ({ checkList, handleRadioChange }) => {
  const sections = [
    //manejamos y renderizamos los apartados con sus element
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