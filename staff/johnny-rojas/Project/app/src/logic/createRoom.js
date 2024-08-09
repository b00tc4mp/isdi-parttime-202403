import errors, { SystemError } from "com/errors";
import validate from "com/validate";
import extractPayloadFromJWT from "../../utils/extractPayloadFromJWT";

const createRoom = (nameRoom, region, city, image, description, price) => {
  validate.nameRoom(nameRoom, 'name room');
  validate.region(region, 'region');
  validate.text(city, 'city')
  validate.url(image, 'image');
  validate.text(description, 'description');
  validate.price(price, 'price');

  return fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nameRoom, region, city, image, description, price})
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 201) return

      return response.json()
        .catch(() => { throw new SystemError('network error') })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default createRoom