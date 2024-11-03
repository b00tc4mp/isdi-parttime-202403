import errors, { SystemError } from 'com/errors.js';
import validate from 'com/validate.js';

const updateRecipe = (recipeId, updatedRecipe) => {
    validate.id(recipeId, 'recipeId');
    validate.text(updatedRecipe.title, 'title', 30);
    validate.url(updatedRecipe.thumbnail, 'thumbnail');
    validate.number(updatedRecipe.cookTime, 'cookTime');
    validate.ingredientArray(updatedRecipe.ingredients, 'ingredients');
    validate.text(updatedRecipe.description, 'description', 200);

    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
    })
        .catch(() => { throw new SystemError('Server error'); })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('Failed to parse response'); });
            } else {
                return response.json()
                    .catch(() => { throw new SystemError('Server error'); })
                    .then(body => {
                        const { error, message } = body;
                        const Constructor = errors[error];
                        throw new Constructor(message);
                    });
            }
        });
};

export default updateRecipe;
