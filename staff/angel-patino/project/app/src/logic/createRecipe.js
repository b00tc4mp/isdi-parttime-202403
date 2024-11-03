import errors, { SystemError } from 'com/errors.js';
import validate from 'com/validate.js';

const createRecipe = (title, thumbnail, cookTime, ingredients, description) => {
    // Validate inputs with proper error messages
    validate.text(title, 'title', 30);
    validate.url(thumbnail, 'thumbnail');
    validate.number(cookTime, 'cookTime');
    validate.ingredientArray(ingredients, 'ingredients');
    validate.text(description, 'description', 200);

    // Prepare the fetch request
    return fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            thumbnail,
            cookTime,
            ingredients: ingredients.map(ingredient => {
                // Ensure every ingredient has name, quantity, and unit
                if (!ingredient.name || !ingredient.quantity || !ingredient.unit) {
                    throw new Error('Each ingredient must have a name, quantity, and unit.');
                }
                return {
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit
                };
            }),
            description,
        }),
    })
        .then(response => {
            if (response.status === 201) {
                return; // Successful recipe creation, no further action needed
            }

            // Handle non-201 responses by attempting to parse the error response
            return response.json()
                .catch(() => { throw new SystemError('Failed to parse server response'); })
                .then(body => {
                    const { error, message } = body;

                    if (errors[error]) {
                        throw new errors[error](message);
                    } else {
                        throw new Error(message);
                    }
                });
        })
        .catch(() => { throw new SystemError('Network or server error occurred'); });
};

export default createRecipe;
