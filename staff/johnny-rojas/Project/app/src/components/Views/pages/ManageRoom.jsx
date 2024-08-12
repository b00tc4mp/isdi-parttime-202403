import { getUserId } from "../../../logic/getUserInfo"
import TopBar from '../library/TopBar';
import Header from '../core/Header';
import FormWithPanel from '../core/FormWithPanel';
import View from '../core/View';
import SubmitButton from '../core/SubmitButton';
import Field from '../core/Field';
import Title from '../core/Title';
import { useNavigate, useParams } from "react-router-dom";
import logic from "../../../logic/index"



function ManageRoom() {
  const { roomId } = useParams()
  const userId = getUserId()
  const navigate = useNavigate()

  const handlerEditRoom = event => {
    event.preventDefault()

    const target = event.target

    const nameRoom = target.nameRoom.value
    const region = target.region.value
    const city = target.city.value
    const img = target.img.value
    const description = target.description.value
    const price = target.price.value

    const updates = {
      nameRoom,
      region,
      city,
      img,
      description,
      price
    }

    try {
      logic.editRoom(userId, roomId, updates)
        .then(() => {
          navigate(`/users/${userId}/rooms`)
        })
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }
  const handlerDeleteRoom = () => {
    try {
      logic.deleteRoom(userId, roomId)
        .then(() => {
          navigate(`/users/${userId}/rooms`)
        })
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }




  return <div>
    <Header>
      <TopBar />
    </Header>
    <div>

      <View className='RegisterForm' tag='main'>

        <Title className='TitleCreateRoom'>Edita tu habitación</Title>

        <FormWithPanel onSubmit={handlerEditRoom}>

          <Field id='nameRoom' type='text' placeholder='Nombre de la habitación' />

          <Field id='region' type='text' placeholder='Región' />

          <Field id='city' type='text' placeholder='Estado y ciudad' />

          <Field id='img' type='string' placeholder='Imagen principal (link)' />

          <Field id='description' type='string' placeholder='Descripción del alojamiento' />

          <Field id='price' type='string' placeholder='Precio por noche' />

          <SubmitButton>Realizar cambios</SubmitButton>

          <div>
            <button id="DeleteButton" className="DeleteButton" onClick={handlerDeleteRoom}>Eliminar habitacion</button>
          </div>

        </FormWithPanel>
      </View>

    </div>
  </div>
}

export default ManageRoom

//TODO MEJORAR BOTON DELETE