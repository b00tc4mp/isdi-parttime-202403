import logic from './index.js'

try {
  logic.deletePost("Jack", "928542516335713-1718819611333", error => {

    if (error) {
      console.error(error)

      return
    }

    console.log("posts deleted")
  })

} catch (error) {

  console.error(error)
}