import { useState } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import logic from "./logic"

import Login from "./views/Login"
import Register from "./views/Register"
import HomeView from "./views/components/HomeView"
import CreateRecipeView from "./views/components/CreateRecipeView"
import FavoritesListView from "./views/components/FavoritesListView"
import SearchView from "./views/components/SearchView"
import MyRecipesView from "./views/components/MyRecipesView"
import Footer from "./views/components/Footer"

function App() {
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleGoToLogin = () => navigate("/login")
  const handleGoToHome = () => navigate("/")
  const handleGoToRegister = () => navigate("/register")

  const handleMessage = (message) => setMessage(message)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="main-content w-full flex-grow">
        <Routes>
          <Route
            path="/register"
            element={
              logic.isUserLoggedIn() ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onUserRegistered={handleGoToLogin}
                  onLoginLinkClick={handleGoToLogin}
                />
              )
            }
          />

          <Route
            path="/login"
            element={
              logic.isUserLoggedIn() ? (
                <Navigate to="/" />
              ) : (
                <Login
                  onUserLoggedIn={handleGoToHome}
                  onRegisterLinkClick={handleGoToRegister}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              logic.isUserLoggedIn() ? (
                <HomeView onUserLoggedOut={handleGoToLogin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/create-recipe"
            element={
              logic.isUserLoggedIn() ? (
                <CreateRecipeView onRecipeCreated={handleGoToHome} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/favorites"
            element={
              logic.isUserLoggedIn() ? (
                <FavoritesListView />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/search"
            element={
              logic.isUserLoggedIn() ? <SearchView /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/my-recipes"
            element={
              logic.isUserLoggedIn() ? (
                <MyRecipesView />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
