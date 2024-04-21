import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Textarea, Flex, Heading, useToast,
    Select, VStack, HStack, IconButton, Image, Center, Text
} from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import { fetchRecipesByIngredients, submitRecipeToBackend } from "../script/helper.js"; // Adjust path as necessary
import { CreatableSelect } from 'chakra-react-select';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const CreateRecipeAPI = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const toast = useToast();

    // Fetch recipes based on ingredients from the API
    useEffect(() => {
        const fetchRecipes = async () => {
            const data = await fetchRecipesByIngredients(searchTerm);
            setRecipes(data);
        };

        if (searchTerm) {
            fetchRecipes();
        }
    }, [searchTerm]);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleSubmit = async () => {
        if (!selectedRecipe) {
            toast({
                title: "Error",
                description: "No recipe selected",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await submitRecipeToBackend(selectedRecipe);
            toast({
                title: "Recipe Submitted",
                description: "Recipe successfully submitted to the backend",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setSelectedRecipe(null); // Reset selection
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" align="center" p={5}>
            <Heading mb={6}>Submit Recipe to Backend</Heading>
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel>Search Term for Ingredients</FormLabel>
                    <Input
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </FormControl>

                {recipes.length > 0 && (
                    <FormControl>
                        <FormLabel>Select a Recipe</FormLabel>
                        <Select onChange={(e) => handleSelectRecipe(recipes.find(r => r.id === e.target.value))}>
                            {recipes.map(recipe => (
                                <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {selectedRecipe && (
                    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Heading as="h3" size="lg">{selectedRecipe.title}</Heading>
                        <Image src={selectedRecipe.image} alt={selectedRecipe.title} />
                        <Text mt={2}>{selectedRecipe.description}</Text>
                    </Box>
                )}

                <Button colorScheme="blue" onClick={handleSubmit}>
                    Submit Recipe
                </Button>
            </VStack>
        </Flex>
    );
};

export default CreateRecipeAPI;
