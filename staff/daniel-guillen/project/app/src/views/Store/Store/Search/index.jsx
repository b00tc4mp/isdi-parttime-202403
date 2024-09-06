import './index.css'
//components
import WasteSelect from '../../components/WasteSelect'
import WasteItem from '../../components/WasteItem'
import MenuStore from '../../components/MenuStore'
//hooks
import useFetchList from '../../../../hooks/useFetchList'
import useDeleteItem from '../../../../hooks/useDeleteItem'
//utils
import filterByMonthYear from '../../../../utils/filterByMonthYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

const SearchWaste = () => {

    const [selectedWaste, setSelectedWaste] = useState( { code: "" } )

    const handleWasteChange = (selectedOption) => {
      setSelectedWaste(selectedOption)
      console.log("Residuos seleccionados:", selectedOption)
    }

    const { list } = useFetchList('dataStoreWaste')
    const { deleteWaste  } = useDeleteItem('dataStoreWaste')

    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
  
    // Filtramos los residuos por mes y año
    const filteredList = filterByMonthYear(list, month, year)
  
    // Filtramos por selectedWaste
    const selectedWasteList = filteredList.filter(item => item.code === selectedWaste.code)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(selectedWasteList)

  return (

    <div className='SearchWasteDiv'>
    <h1 className='RouteTitle'>BUSCADOR</h1>
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      
        <h2 className='title'>Resultados...</h2>
      
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
        <MenuStore />
    </div>

  )
}

export default SearchWaste