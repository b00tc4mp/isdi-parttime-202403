import data from './container.json'

const getItemListContainer = () => {
    return new Promise((resolve, reject) =>{
      resolve(data)
    })
  }

export default getItemListContainer