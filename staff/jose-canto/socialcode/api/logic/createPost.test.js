import logic from './index.js'

try {
  logic.createPost("Jack", "hello World", "https://media.giphy.com/media/9FEMsCDEta9sL0GpKM/giphy.gif?cid=82a1493bf2ixl19i6a1ge1o8kpqdj1rbnkpc7k7xpvjn3mvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "how are you?", (error) => {

    if (error) {
      console.error(error)

      return
    }

    console.log("posts created")
  })

} catch (error) {

  console.error(error)
}
