function Form() {
  const handleInputSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value

    const validation = validateCredentials(username, password)

    if (validation) {
      alert('Login Successful')
    } else {
      alert('Login Failed')
      return
    }

    console.log(`Username: ${username}, Password: ${password}`)

    form.reset()
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleInputSubmit}>
        <Field
          type='text'
          id='username'
          htmlFor='username'
          name='username'
          text='Username:'
        />
        <Field
          type='password'
          id='password'
          htmlFor='password'
          name='password'
          text='Password:'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
