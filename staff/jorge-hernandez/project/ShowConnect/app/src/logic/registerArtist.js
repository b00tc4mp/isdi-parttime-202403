import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerArtist = (
  name,
  artisticName,
  discipline,
  city,
  description,
  email,
  image,
  video,
  password,
  passwordRepeat
) => {
  validate.name(name)
  validate.name(artisticName, 'artisticName')
  validate.email(email)
  validate.text(discipline, 'discipline')
  validate.text(city, 'city')
  validate.text(description, 'description')
  validate.url(image, 'image')
  validate.url(video, 'video')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return fetch(`${import.meta.env.VITE_API_URL}users`, {
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
      image,
      video,
      password,
      passwordRepeat,
    }),
  })
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 201) return

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

export default registerArtist
