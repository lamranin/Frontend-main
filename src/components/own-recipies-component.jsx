import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { fetchOwnRecipes } from '../script/helper'; // Adjust the import path as necessary
import RecipeCard from './recipe-card';

const OwnRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const fetchedRecipes = await fetchOwnRecipes();
                setRecipes(fetchedRecipes.recipes);
                setLoading(false);
            } catch (error) {
                setError('Failed to load recipes');
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <Box>
            {recipes.length > 0 ? (
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={{ sm: "5", md: "6", lg: "8" }}>
                    {recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </SimpleGrid>
            ) : (
                <Text>No recipes found.</Text>
            )}
        </Box>

    );
};

export default OwnRecipes;
