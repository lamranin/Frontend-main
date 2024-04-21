import React, { useState, useEffect } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Textarea, Flex, Heading, useToast,
    Select, VStack, HStack, IconButton, Image, Center, Text
} from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import { createCategoryOrIngredient, createRecipe, getIngredients, getRecipeTypes, uploadImage } from "../script/helper.js"; // Adjust path as necessary
import { CreatableSelect } from 'chakra-react-select';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [recipeTypes, setRecipeTypes] = useState([]);
    const toast = useToast();

    // Fetch recipe types and ingredients
    useEffect(() => {
        const fetchRecipeTypes = async () => {
            const types = await getRecipeTypes();
            setRecipeTypes(types);
        };
        fetchRecipeTypes();
    }, []);

    useEffect(() => {
        const fetchIngredients = async () => {
            const fetchedIngredients = await getIngredients();
            setIngredients(fetchedIngredients);
        };
        fetchIngredients();
    }, []);

    // Handlers
    const handleImageChange = async (e) => {
        // Image upload logic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic
    };

    const handleIngredientSelect = (newValue) => {
        setSelectedIngredients([...selectedIngredients, { ...newValue, amount: '', unit: '' }]);
    };

    const handleCreateType = async (inputValue) => {
        const newType = await createCategoryOrIngredient(inputValue, "category");
        if (newType) {
            setRecipeTypes([...recipeTypes, { label: newType.label, value: newType.value }]);
            setCategory({ label: newType, value: newType });
        }
    }

    const handleCreateIngredient = async (inputValue) => {
        const newIngredient = await createCategoryOrIngredient(inputValue, "ingredient");
        if (newIngredient) {
            setRecipeTypes([...recipeTypes, { label: newIngredient.label, value: newIngredient.value }]);
            setCategory({ label: newIngredient.label, value: newIngredient.value });
        }
    }

    const updateSelectedIngredient = (index, field, value) => {
        const updatedIngredients = selectedIngredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [field]: value };
            }
            return ingredient;
        });
        setSelectedIngredients(updatedIngredients);
    };

    const removeSelectedIngredient = (index) => {
        const updatedIngredients = selectedIngredients.filter((_, i) => i !== index);
        setSelectedIngredients(updatedIngredients);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const imageUrl = await uploadImage(file);
            setImage(imageUrl);
            toast({
                title: 'Image Uploaded',
                description: 'Image uploaded successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Image Upload Failed',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setUploadingImage(false);
        }
    };
    const initialState = {
        title: '',
        content: '',
        categoryName: null, // Assuming this is the initial state for category selection
        selectedIngredients: [], // Assuming you're managing selected ingredients as an array of objects
        image: '', // URL of the uploaded image
    };

    const resetState = () => {
        setTitle(initialState.title);
        setContent(initialState.content);
        setCategory(initialState.categoryName);
        setSelectedIngredients(initialState.selectedIngredients);
        setImage(initialState.image);
        // Reset other state variables back to their initial values as needed
    };

    const handleSubmitRecipe = async (e) => {
        e.preventDefault();
        if (title && content && category.value) {
            const recipeData = {
                title,
                content,
                categoryName: category ? category.label : '', // Adjust if you're using a different state structure
                images: [image], // Assuming a single image for simplicity; adjust as needed
                ingredientRecords: selectedIngredients.map(ingredient => ({
                    name: ingredient.label, // Adjust based on your ingredient selection implementation
                    quantity: ingredient.amount,
                    unit: ingredient.unit
                }))
            };

            try {
                const createdRecipe = await createRecipe(recipeData);
                console.log('Recipe created successfully:', createdRecipe);
                if (createdRecipe) {
                    toast({
                        title: 'Recipe Created',
                        description: 'Your recipe has been successfully created.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    resetState();
                }

                // Optionally reset form state or redirect user
            } catch (error) {
                toast({
                    title: 'Creation Failed',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Flex direction="column" p={5} align="center">
            <Heading mb={6}>Create New Recipe</Heading>
            <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch" width="100%" maxWidth="800px">
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <CreatableSelect
                        isClearable
                        onChange={setCategory}
                        options={recipeTypes}
                        placeholder="Select or create a category..."
                        onCreateOption={handleCreateType}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Ingredients</FormLabel>
                    <CreatableSelect
                        placeholder="Select or create ingredients..."
                        onChange={(e) => handleIngredientSelect(e)}
                        options={ingredients}
                        onCreateOption={handleCreateIngredient}
                    />
                </FormControl>

                {selectedIngredients.map((ingredient, index) => (
                    <HStack key={index} spacing={4}>
                        <Text>{ingredient.label}</Text>
                        <Input
                            placeholder="Amount"
                            value={ingredient.amount}
                            onChange={(e) => updateSelectedIngredient(index, 'amount', e.target.value)}
                        />
                        <Input
                            placeholder="Unit"
                            value={ingredient.unit}
                            onChange={(e) => updateSelectedIngredient(index, 'unit', e.target.value)}
                        />
                        <IconButton
                            aria-label="Remove ingredient"
                            icon={<AiOutlineUpload />}
                            onClick={() => removeSelectedIngredient(index)}
                        />
                    </HStack>
                ))}

                <FormControl isRequired>
                    <FormLabel>Recipe Content</FormLabel>
                    <ReactQuill theme="snow" value={content} onChange={setContent} />
                </FormControl>

                <FormControl>
                    <FormLabel>Upload Image</FormLabel>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    {image && (
                        <Center py={2}>
                            <Image src={image} boxSize="150px" borderRadius="full" />
                        </Center>
                    )}
                </FormControl>

                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={uploadingImage}
                    onClick={handleSubmitRecipe}
                    onSubmit={handleSubmitRecipe}
                    type="submit"
                >
                    Create Recipe
                </Button>
            </VStack>
        </Flex>
    );
};
export default CreateRecipe;
