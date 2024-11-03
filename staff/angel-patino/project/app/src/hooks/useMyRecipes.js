import { useState, useEffect } from "react"
import logic from "../logic/index.js"

export function useMyRecipes() {
    const [myRecipes, setMyRecipes] = useState([])

    useEffect(() => {
        loadMyRecipes()
    }, [])

    const loadMyRecipes = () => {
        try {
            logic
                .getAllRecipes()
                .then((recipes) => {
                    const userId = logic.getUserId()
                    const userRecipes = recipes.filter((recipe) => recipe.author.id === userId)
                    setMyRecipes(userRecipes)
                })
                .catch((error) => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    return myRecipes
}
