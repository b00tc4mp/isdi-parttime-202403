import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (
  name,
  artisticName,
  discipline,
  city,
  description,
  email,
  images,
  video,
  password,
  passwordRepeat
) => {
  validate.name(name)
  validate.name(artisticName, 'surname')
  validate.email(email)
  validate.text(discipline, 'discipline')
  validate.text(city, 'city')
  validate.text(description, 'description')
  validate.url(images, 'images')
  validate.url(video, 'video')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return fetch(`http://localhost:8080/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      artisticName,
      discipline,
      city,
      description,
      email,
      images,
      video,
      password,
      passwordRepeat,
    }),
  })
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 201) {
        console.log('user registered')
        return
      }

      return response
        .json()
        .catch(() => {
          throw new SystemError('server error')
        })
        .then((body) => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default registerUser
