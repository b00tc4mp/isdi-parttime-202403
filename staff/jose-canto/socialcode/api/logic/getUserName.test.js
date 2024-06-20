import logic from './index.js'


try {
  logic.getUserName("Jack", "Jack", (error, name) => {
    if (error) {

      console.error(error)

      return
    }

    console.log(`Name : ${name}`)
  })

} catch (error) {
  console.error(error)
}

