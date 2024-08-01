import Link from '../core/Link';
import Button from '../core/Button';
import Input from '../core/Input';
import View from '../core/View';

function TopBar() {
  return <View tag='main'>
    <Button></Button>
    <Input id='search' type='text' placeholder='¿A dónde quieres ir?'></Input>
    <Image></Image>
    <Link className='Link' to='/login'>Inicia sesión</Link>
    <Link className='Link' to='/register'>Regístrate</Link>
    <navbar></navbar>
  </View>
}