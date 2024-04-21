import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { fetchPaginatedRecipes, getIngredients, getRecipeTypes, searchRecipe } from '../script/helper'; // Adjust the import path as necessary
import RecipeCard from './recipe-card';
import { Select } from 'chakra-react-select'

const RecipeFeedComponent = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [clearSearch, setClearSearch] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipeTypes, setRecipeTypes] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [selectedRecipeType, setSelectedRecipeType] = useState("");

    useEffect(() => {
        setLoading(true);
        if (selectedIngredient !== "" || selectedRecipeType !== "") {
            searchRecipe(searchItem === "" ? "all" : searchItem, selectedIngredient, selectedRecipeType, currentPage)
                .then((data) => setRecipes(data.recipes))
                .catch(error => setError(error))
                .finally(() => setLoading(false));
        }
        else if (searchItem === "" && !(selectedIngredient || selectedRecipeType)) {
            fetchPaginatedRecipes(currentPage)
                .then(setRecipes)
                .catch(error => console.error(error))
                .finally(() => setLoading(false));
        } else {
            searchRecipe(searchItem === "" ? "all" : searchItem, selectedIngredient, selectedRecipeType, currentPage)
                .then((data) => setRecipes(data.recipes))
                .catch(error => setError(error))
                .finally(() => setLoading(false));

            setCurrentPage(1);
        }
    }, [currentPage, clearSearch, selectedIngredient, selectedRecipeType]);

    useEffect(() => {
        searchRecipe(searchItem === "" ? "all" : searchItem, selectedIngredient, selectedRecipeType, currentPage)
            .then((data) => setRecipes(data.recipes))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [selectedIngredient, selectedRecipeType, currentPage]);

    const fetchRecipeTypes = async () => {
        const types = await getRecipeTypes();
        setRecipeTypes(types);
    };
    const fetchIngredients = async () => {
        const fetchedIngredients = await getIngredients();
        setIngredients(fetchedIngredients);
    };

    useEffect(() => {
        if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [currentPage]);

    useEffect(() => {
        if (recipeTypes.length === 0) {
            fetchRecipeTypes();
        }
        if (ingredients.length === 0) {
            fetchIngredients();
        }

    }, [recipeTypes, ingredients]);

    const handleSearch = () => {
        setLoading(true);
        if (searchItem !== "") {
            // The useEffect will handle the search, no need to duplicate the logic
            setClearSearch(!clearSearch);
        }
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        (recipeTypes.length && ingredients.length) && <Box>
            <Stack direction={"column"} p={2}>
                <Input
                    placeholder="Search for recipes"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}

                />
                <Stack direction="row" justifyContent="end">
                    <Stack direction="row" alignItems="center">
                        <Text htmlFor="recipeTypeSelect" minWidth="100px">Recipe Type:</Text>
                        <Select
                            id="recipeTypeSelect"
                            options={recipeTypes}
                            onChange={(selected) => setSelectedRecipeType(selected.value)}
                            placeholder="Select Recipe Type"
                            value={{
                                label: selectedRecipeType,
                                value: selectedRecipeType
                            }}
                            minWidth="200px" // Adjust the minimum width as needed
                        />
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <Text htmlFor="ingredientSelect" minWidth="100px">Ingredient:</Text>
                        <Select
                            id="ingredientSelect"
                            options={ingredients}
                            onChange={(selected) => setSelectedIngredient(selected.value)}
                            placeholder="Select Ingredient"
                            value={{
                                label: selectedIngredient,
                                value: selectedIngredient
                            }}

                            minWidth="200px" // Adjust the minimum width as needed
                        />
                    </Stack>

                    <Button onClick={handleSearch} isDisabled={searchItem.length <= 3}>Search</Button>
                    <Button onClick={() => {
                        setSearchItem("");
                        setClearSearch(!clearSearch);
                    }}>Clear Result</Button>
                </Stack>


            </Stack>
            {recipes.length > 0 ? (
                <Box>
                    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={{ sm: "5", md: "6", lg: "8" }}>
                        {recipes.map((recipe) => (
                            <RecipeCard recipe={recipe} key={recipe.id} />
                        ))}
                    </SimpleGrid>
                    <Stack direction={"row"} justifyContent={"end"}>
                        <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={(currentPage === 1)}>Previous Page</Button>
                        <Button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</Button>
                    </Stack>

                </Box>
            ) : (
                <>
                    <Text>No recipes found.</Text>
                    <Flex justifyContent="flex-end" mt={4}>
                        <Button onClick={() => setCurrentPage(currentPage - 1)}>Previous Page</Button>
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default RecipeFeedComponent;
