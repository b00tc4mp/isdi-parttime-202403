import './View.css'

function View({ tag: Tag = 'div', children }) {
  return <Tag className='View home-container'>{children}</Tag>
}

export default View
