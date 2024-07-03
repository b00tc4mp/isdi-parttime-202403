import './Footer.css'

import Button from '../../components/core/Button'

function Footer({ onCreatePostClick }) {
  const handleCreatePostClick = () => onCreatePostClick()

  const date = new Date()
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = date.toLocaleDateString(undefined, options)

  return (
    <footer className='Footer'>
      <Button onClick={handleCreatePostClick}>+</Button>
      <time>{formattedDate}</time>
    </footer>
  )
}

export default Footer
