import Header from '../Views/components/Header'
import '../core/PrincipalBar.css'
import MyIcon from '/SocialCode.svg'

import Button from '../core/Button'
import Heading from '../core/Heading'

function PrincipalBar({ name, onClick, children }) {
  
  const scrollTop = () => { 
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    })
   }

  return <Header>
    <Heading level="3">{name}</Heading>
    <div className='ContentLogo'>
      <img className="Logo" src={MyIcon} alt="SocialCodeLogo" onClick={scrollTop}></img>
    </div>
    <Button className="LogoutButton" onClick={onClick}>{children}</Button>
</Header>
}

export default PrincipalBar