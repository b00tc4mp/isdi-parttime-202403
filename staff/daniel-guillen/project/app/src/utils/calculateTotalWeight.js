const calculateTotalWeight = (data) => {
    if (data.length === 0) {
      return null // Si no hay datos no calcular sino falla
    }
  
    const totalWeight = data.reduce((acc, item) => {
      return acc + parseFloat(item.weight)
    }, 0)
  
    // Retornar un objeto con el code, description y totalWeight
    return {
      code: data[0].code,           // code
      description: data[0].description, // description
      totalWeight: totalWeight       // peso total calculado
    }
  }
  
  export default calculateTotalWeight  