import Field from '../../components/core/Field'
import Heading from '../../components/core/Heading'
import logic from '../../logic'
import Button from '../../components/core/Button'
import FormWithFeedback from '../../components/library/FormWithFeedback'

function CreatePostForm({ onCancelCreatePostClick, onPostCreated }) {
  console.log('CreatePostForm -> render')

  const handleCancelCreatePostClick = () => {
    onCancelCreatePostClick()
  }

  const handleCreatePostSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const title = form.title.value
    const image = form.image.value
    const description = form.description.value

    try {
      logic
        .createPost(title, image, description)
        .then(() => {
          onPostCreated()
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  return (
    <FormWithFeedback
      className='CreatePostForm'
      onSubmit={handleCreatePostSubmit}
    >
      <Heading level='1'>Create New Post</Heading>
      <Field id='title' type='text' placeholder='title'>
        Title
      </Field>
      <Field id='image' type='text' placeholder='url image'>
        url Image
      </Field>
      <Field id='description' type='text' placeholder='description'>
        description
      </Field>
      <Button type='button' onClick={handleCancelCreatePostClick}>
        Cancel
      </Button>
      <Button type='submit'>Create</Button>
    </FormWithFeedback>
  )
}

export default CreatePostForm
