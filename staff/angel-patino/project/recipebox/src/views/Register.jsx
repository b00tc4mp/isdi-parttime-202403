import { useState } from "react"
import logic from "../logic"

import View from "../components/library/View"
import { SystemError } from "com/errors"

import Link from "./components/Link"

function Register({ onUserRegistered, onLoginLinkClick }) {
  const [message, setMessage] = useState("")

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic
        .registerUser(name, surname, email, username, password, passwordRepeat)
        .then(() => onUserRegistered())
        .catch((error) => {
          console.log(error)

          if (error instanceof SystemError) {
            alert(error.message)

            return
          }

          setMessage(error.message)
        })
    } catch (error) {
      console.error(error)

      setMessage(error.message)
    }
  }

  const handleLoginClick = (event) => {
    event.preventDefault()

    onLoginLinkClick()
  }
  return (
    <View tag="main">
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
        <h1 className="text-5xl font-semibold">Login</h1>
        <p className="font-medium text-lg text-gray-500 mt-4 ">
          Hello! Register to get started{" "}
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} message={message}>
        <div>
          <label className="text-lg font-medium">Name</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="name"
            id="name"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Surname</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="surname"
            id="surname"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="email"
            id="email"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Username</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="username"
            id="username"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="password"
            placeholder="password"
            type="password"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password Repeat</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            id="passwordRepeat"
            placeholder="password repeat"
            type="password"
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-1">
          <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-slate-950 text-white text-lg font-bold">
            Create an account
          </button>
        </div>
      </form>

      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
          Or Register with
        </span>
      </div>
      <button className="flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-3 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-outpy-3  bg-google-button-blue p-0.5 pr-4 transition-colors duration-300 hover:bg-google-button-blue-hover">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            class="fill-google-logo-blue"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            class="fill-google-logo-green"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            class="fill-google-logo-yellow"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            class="fill-google-logo-red"
          ></path>
        </svg>
        Sign in with Google
      </button>

      <div className="my-8 flex justify-center items-center">
        <p className="font-medium text-base">Already have an account?</p>
        <Link
          onClick={handleLoginClick}
          className="text-blue-500 text-base font-medium ml-2"
        >
          Login Now
        </Link>
      </div>
    </View>
  )
}
export default Register
