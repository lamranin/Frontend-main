import axios from "axios";



export async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const apiKey = '4ad600902a3e3c734c39512d33d14907';
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.status === 200) {
            console.log('Image uploaded successfully:', data.data.url);
            // Here you can handle the uploaded image URL, e.g., display the image or save the URL to your database
            return data.data.url;
        } else {
            console.error('Failed to upload image:', data);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

export async function fetchUserProfile() {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    const url = `${process.env.REACT_APP_API_URL}/user-profile`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User profile:', data);
            return data;
        } else {
            console.error('Failed to fetch user profile:', response);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

export async function updateProfile(profileData) {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token
    const url = `${process.env.REACT_APP_API_URL}/update-profile`; // Use your actual API URL

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            console.error('Failed to update profile');
        }

        const data = await response.json();
        console.log('Profile updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

export async function getIngredients() {
    const url = `${process.env.REACT_APP_API_URL}/ingredients`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Ingredients:', data);
            return data.ingredientList.map(ingredient => {
                return {
                    label: ingredient.name,
                    value: ingredient.name
                }
            });
        } else {
            console.error('Failed to fetch ingredients:', response);
        }
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}

export async function getRecipeTypes() {
    const url = `${process.env.REACT_APP_API_URL}/categories`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('categories:', data);
            return data.categories.map(category => {
                return {
                    label: category.name,
                    value: category.name
                }
            });
        } else {
            console.error('Failed to fetch ingredients:', response);
            return [];
        }
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}

export async function createCategoryOrIngredient(name, type) {
    const url = `${process.env.REACT_APP_API_URL}/createTypeOrIngredient`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "data": {
                    name,
                    type
                }
            }
            )
        });

        if (response.ok) {
            const data = await response.json();
            console.log('categories:', data);
            return {
                label: data.result.name,
                value: data.result.name
            }
        } else {
            console.error('Failed to fetch ingredients:', response);
            return [];
        }
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}

export async function createArticle (articleData){

    const url = `${process.env.REACT_APP_API_URL}/article/create`;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally include authorization header if your API requires
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data: { article: articleData } }) // Adjust according to your expected request body structure
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create article on the front end');
    }

    const data = await response.json();
    return data; // The created article data is returned (adjust based on your actual API response)
} catch (error) {
    console.error('Error creating article:', error);
    throw error;
    }
}





export async function fetchArticleDetails(userID) {
    const url = `${process.env.REACT_APP_API_URL}/article/get?id=${userID}`; // Adjust the URL as per your setup
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipe details. Please try again later.');
        }

        const data = await response.json();
        return data; // Assuming the backend returns the recipe details in the response body
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error; // Consider how you want to handle errors. You might want to return a default value or re-throw the error.
    }
}

export async function createRecipe(recipeData) {
    const url = `${process.env.REACT_APP_API_URL}/recipe/create`; // Adjust the endpoint as necessary
    const token = localStorage.getItem('token'); // Assuming you're using token-based authentication

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request
            },
            body: JSON.stringify({ data: { recipe: recipeData } }) // Adjust according to your expected request body structure
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create recipe on the front end');
        }

        const data = await response.json();
        return data; // The created recipe data is returned (adjust based on your actual API response)
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
}

export async function fetchOwnRecipes() {
    const url = `${process.env.REACT_APP_API_URL}/get-own-recipe`; // Adjust with your actual API URL
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipes. Please try again later.');
        }

        const data = await response.json();
        return data; // Returns the fetched recipes data
    } catch (error) {
        console.error('Error fetching own recipes:', error);
        throw error; // Rethrow or handle as needed
    }
}

export async function fetchUserSavedRecipes() {
    const url = `${process.env.REACT_APP_API_URL}/get-user-saved-recipe`; // Adjust with your actual API URL
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipes. Please try again later.');
        }

        const data = await response.json();
        return data; // Returns the fetched recipes data
    } catch (error) {
        console.error('Error fetching own recipes:', error);
        throw error; // Rethrow or handle as needed
    }
}

export async function saveRecipe(recipeId) {
    const url = `${process.env.REACT_APP_API_URL}/recipe/save`; // Adjust with your actual API URL
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request
            },
            body: JSON.stringify({ data: { recipeId: recipeId } }) // Adjust according to your expected request body structure
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipes. Please try again later.');
        }

        const data = await response.json();
        return data; // Returns the fetched recipes data
    } catch (error) {
        console.error('Error fetching own recipes:', error);
        throw error; // Rethrow or handle as needed
    }
}

export async function fetchRecipeDetails(recipeId) {
    const url = `${process.env.REACT_APP_API_URL}/recipe/get?id=${recipeId}`; // Adjust the URL as per your setup
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipe details. Please try again later.');
        }

        const data = await response.json();
        return data; // Assuming the backend returns the recipe details in the response body
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error; // Consider how you want to handle errors. You might want to return a default value or re-throw the error.
    }
}

export async function fetchPaginatedRecipes(page = 1, limit = 10) {
    const url = `${process.env.REACT_APP_API_URL}/getPaginatedRecipes?page=${page}&limit=${limit}`; // Adjust the URL as per your setup
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch paginated recipes. Please try again later.');
        }

        const data = await response.json();
        return data.recipes; // Assuming the backend returns an object with a recipes array
    } catch (error) {
        console.error('Error fetching paginated recipes:', error);
        throw error; // Consider how you want to handle errors. You might want to return a default value or re-throw the error.
    }
}

export async function addCommentToRecipe(recipeId, commentText) {
    const url = `${process.env.REACT_APP_API_URL}/recipe/comment`; // Adjust this URL as necessary
    const token = localStorage.getItem('token'); // Retrieve the auth token from localStorage

    const requestBody = {
        data: {
            recipeId,
            comment: commentText
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the auth token in the request headers
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add comment to recipe');
        }

        const data = await response.json(); // Assuming the server responds with the added comment or some success message
        return data; // You can return this data or handle it as needed
    } catch (error) {
        console.error('Error adding comment to recipe:', error);
        throw error; // Rethrow the error for further handling or showing an error message in the UI
    }
}


export async function fetchRecipeById(id) {
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export async function fetchRecipeNutritionById(id) {
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export async function searchRecipeByParams(params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?${query}`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
/*
export async function searchRecipeByIngredients(params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?${query}`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
*/
export async function ingredientRecipeSearch(params){
    const axios = require('axios');
    const query = new URLSearchParams(params).toString();
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        params: {
            ingredients: query,
            number: '10',
            ignorePantry: 'true',
            ranking: '1'
        },
        headers: {
            'X-RapidAPI-Key': 'c9168e9596msh1b0b6c14a7e5570p1c8d3djsn0b61eeb517f1',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export async function searchRecipeVideos(params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search?${query}`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export async function nutritionLabel(id){
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionLabel.png?showOptionalNutrients=false&showZeroValues=false&showIngredients=true`
    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return url;
};

export async function IngredientSuggestion(params){
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?${query}&number=10`,{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
           
        }
    });
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();

} 

export async function recipeFromIngredients(params){
    const ingredients = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?${ingredients}&number=10&ranking=1`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
        }
    });

    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    console.log(response);
    return response.json();


}

export async function recipeSummary(id) {
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/summary`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export async function generateMealPlan(params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?${query}`, {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_X_RAPID_API_HOST,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export async function searchRecipe(searchParams, ingredient, recipeCategory, page = 1, limit = 10) {
    let queryParameters = `?searchString=${searchParams}&page=${page}&limit=${limit}`;

    if (ingredient) {
        queryParameters += `&ingredient=${ingredient}`;
    }

    if (recipeCategory) {
        queryParameters += `&recipeCategory=${recipeCategory}`;
    }

    const url = `${process.env.REACT_APP_API_URL}/searchRecipe${queryParameters}`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the auth token in the request headers
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

