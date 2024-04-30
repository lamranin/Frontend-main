import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  Select,
  VStack,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';
import { createArticle, createRecipe} from '../script/helper';
import {useLocation, useNavigate} from 'react-router-dom';
import MiniRecipe from './recipe-article-details';

const ArticleComponent = () => {
  const [newArticleContent, setNewArticleContent] = useState('');
  const navigate = useNavigate();
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const location = useLocation();
  const [selectedRecipeId, setSelectedRecipeId] = useState(location.state.recipeDetails.id);
  
  const toast = useToast();

const handleSaveRecipe = async () => {
  if (location.state.recipeDetails) {
    const recipeData = {
        id: location.state.recipeDetails.id+"",
        title: location.state.recipeDetails.title,
        content: location.state.recipeDetails.instructions,
        categoryName: location.state.recipeDetails.dishTypes[0] || "Lunch", // Adjust if you're using a different state structure
        images: [ location.state.recipeDetails.image], // Assuming a single image for simplicity; adjust as needed
        ingredientRecords: location.state.Ingredients.ingredients?.map(ingredient => ({
            name: ingredient.name, // Adjust based on your ingredient selection implementation
            quantity: ingredient.amount.metric.value +"",
            unit: ingredient.amount.metric.unit
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
}

  const handleSaveArticle = async () => {
    
    setSelectedRecipeId(location.state.recipeDetails.id);
    if (!selectedRecipeId) {
      toast({
        title: 'Error',
        description: "Please select a recipe first.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      
      const articleData = {
        title: newArticleTitle + " - An article on " + location.state.recipeDetails.title,
        content: newArticleContent,
        userId: localStorage.getItem('userId'),
        recipeId: location.state.recipeDetails.id + ""
      };

      

      const data = await createArticle(articleData);
      if(data){
        toast({
            title: 'Article Created',
            description: "Your article has been successfully created.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    
          setNewArticleContent(''); 
          navigate("/dashboard")
      }
      // Clear the textarea after saving
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Failed to create article',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h1" size="xl">What would you like to title your article?</Heading>
      <Textarea
        placeholder="Enter a title..."
        value={newArticleTitle}
        onChange={e => setNewArticleTitle(e.target.value)}
      />
      <Heading as="h2" size="lg">Write an Article</Heading>
      <Textarea
        placeholder="Write your article here..."
        value={newArticleContent}
        onChange={e => setNewArticleContent(e.target.value)}
      />
      <MiniRecipe recipe={location.state.recipeDetails}/>
      <Button colorScheme="teal" onClick={handleSaveArticle}>
        Save Article
      </Button>
    </VStack>
  );
};

export default ArticleComponent;
