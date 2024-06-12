import Button from '../core/Button'

function Footer({ onClick, children }) {
  
  return <Footer>
    <Button className="LogoutButton" onClick={onClick}>{'+'}</Button>
</Footer>
}

export default Footer