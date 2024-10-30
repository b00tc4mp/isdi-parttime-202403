import { SystemError } from "../../../../com/errors"
import sortReferences from "../../utils/sortReference"

const fetchReferencesLoad = async (selectedReference, token) => {
  try {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllReference`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!apiResponse.ok) {
      throw new SystemError('Error al obtener las referencias')
    }

    const result = await apiResponse.json()
    const mappedData = result.map((data) => ({
      value: { reference: data.reference, week: data.week, year: data.year },
      label: `${data.week}/${data.year} - ${data.reference}`,
    }))

    const options = sortReferences(mappedData)

    const selectedOption = options.find(option =>
      option.value.reference === selectedReference?.reference &&
      option.value.week === selectedReference?.week &&
      option.value.year === selectedReference?.year
    )

    return { options, selectedOption }
  } catch (error) {
    console.error('No hay referencias')
    return { options: [], selectedOption: null }
  }
}

export default fetchReferencesLoad

  