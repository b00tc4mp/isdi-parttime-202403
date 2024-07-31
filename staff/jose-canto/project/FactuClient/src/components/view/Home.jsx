import { Link } from "react-router-dom"

import { FaUserEdit } from "react-icons/fa"
import { IoListOutline } from "react-icons/io5"
import { LiaFileInvoiceSolid } from "react-icons/lia"
import { GoNote } from "react-icons/go"
import { GiPapers } from "react-icons/gi"

import Button from "../core/Button"
import Footer from "../core/Footer"
import Header from "../Header"

import "./Home.css"

export default function Home() {
  return (
    <>
      <Header icon={<FaUserEdit />}>Nombre de Usuario</Header>

      <main className="Home">
        <Link to="/customers">
          <Button>
            <span className="Icon">
              <IoListOutline />
            </span>
            Listado Clientes
          </Button>
        </Link>

        <Link to="lastInvoices">
          <Button>
            <span className="Icon">
              <GiPapers />
            </span>
            Ultimas Facturas
          </Button>
        </Link>

        <Link to="createDelivery">
          <Button>
            <span className="Icon">
              <GoNote />
            </span>
            Crear Albarán
          </Button>
        </Link>

        <Link>
          <Button>
            <span className="Icon">
              <LiaFileInvoiceSolid />{" "}
            </span>
            Crear Factura
          </Button>
        </Link>
      </main>

      <div className="ContainerFooter">
        <Footer>FactuClient</Footer>
      </div>
    </>
  )
}
