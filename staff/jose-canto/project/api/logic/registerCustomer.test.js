import "dotenv/config"
import mongoose from "mongoose"
import registerCustomer from "./registerCustomer.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      registerCustomer("66a9e4ccb94351e424af6273", "BruceWayne", "Empresas Wayne, Inc.", "Wayne@enterprise.es", "1234", "B47212561", "Avda. Wayne 1 Gotham City 03001", "655535555")
        //registerCustomer("66a9e4ccb94351e424af6273", "Pepe", "Pepe Fontaneria, S.L.", "Pepe@font.es", "1234", "B01234561", "Calle Fonta 21 Alicante  03001", "655555555")
        .then(() => {
          console.log("Customer Created")
        })
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))