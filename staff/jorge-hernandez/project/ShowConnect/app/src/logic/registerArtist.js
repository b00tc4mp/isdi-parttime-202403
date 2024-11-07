import errors, { SystemError, DuplicityError } from 'com/errors'
import validate from 'com/validate'

const registerArtist = async (
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
  validate.discipline(discipline, 'discipline')
  validate.city(city, 'city')
  validate.text(description, 'description')
  validate.url(image, 'image')
  validate.url(video, 'video')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}users/artists`,
      {
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
      }
    )

    if (response.status === 201) {
      return
    }

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }
    const { error, message } = body

    if (error === 'DuplicityError') {
      throw new DuplicityError('User already exists')
    }

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    if (!(error instanceof DuplicityError) && !(error instanceof SystemError)) {
      throw new SystemError('Server error')
    }
    throw error
  }
}

export default registerArtist
