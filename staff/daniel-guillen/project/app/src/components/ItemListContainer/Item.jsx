import React from 'react'

const Item = ({container}) => {
  return (
    <div className={`wasteContainer ${container.stored} ${container.stagnant}`}>
                  <div className='textContainer'>{container.waste}</div>
                  <div className='textContainer'>{container.stored}</div>
                  <div className='textContainer'>{container.weight}</div>
                  </div>
  )
}

export default Item