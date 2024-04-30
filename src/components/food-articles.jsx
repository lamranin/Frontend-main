import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Container,
  useToast,
  
} from '@chakra-ui/react';
import { recipeFromIngredients } from '../script/helper';
import RecipeSearchByIngredients from './ingredient-search';
import ArticleComponent from './front-articles';
 

const BlogComponent = ({ user }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe.id);
    console.log(selectedRecipe);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const blogArticle = {
      title,
      content,
      recipeId: selectedRecipe.id, // Assuming `id` is available in the recipe object
      userId: user.id,
    };

    // Here, send `blogArticle` to your backend or handle it according to your app's architecture
    console.log(blogArticle); // Log the article or send it to the server
    toast({
      title: "Success",
      description: "Your article has been posted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset the form after successful submission
    setTitle('');
    setContent('');
    setSelectedRecipe(null);
  };

  return (
    <Container maxW="container.md">
      <Heading as="h2" size="lg" mb={4}>Write a Blog Article</Heading>
      
      {/* Recipe Search Component Integration */}
      <RecipeSearchByIngredients onSelectRecipe={handleRecipeSelect}> 

      {selectedRecipe && (
        <Box p={5} shadow="md" borderWidth="1px" mt={4}>
          <FormControl isRequired mt={2}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Article Content</FormLabel>
            <Textarea
              placeholder="Write your article..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              size="lg"
            />
          </FormControl>
          <Button mt={4} colorScheme="blue" onClick={handleSubmit}>Submit Article</Button>
        </Box>
      )}
      </RecipeSearchByIngredients>
    </Container>
  );
};

export default BlogComponent;
