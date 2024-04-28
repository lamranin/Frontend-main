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
import { createArticle } from '../script/helper';
import {useLocation, useNavigate} from 'react-router-dom';

const ArticleComponent = () => {
  const [newArticleContent, setNewArticleContent] = useState('');
  const navigate = useNavigate();
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const location = useLocation();
  const [selectedRecipeId, setSelectedRecipeId] = useState(location.state.recipeDetails.id);
  
  const toast = useToast();

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
        title: newArticleTitle + " - An article on " + location.state.recipeDetails.id,
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
      <Heading as="h2" size="lg">Write an Article</Heading>
      <Textarea
        placeholder="Write your article here..."
        value={newArticleContent}
        onChange={e => setNewArticleContent(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleSaveArticle}>
        Save Article
      </Button>
    </VStack>
  );
};

export default ArticleComponent;
