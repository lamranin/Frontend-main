import React from 'react';
import { Button, useToast,  IconButton,
    Tooltip, Icon } from '@chakra-ui/react';
import { FaBroom } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
const DeleteRecipeButton = ({ recipeId }) => {
  const toast = useToast();
  const navigate = useNavigate(); 
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recipes/:?recipeId=${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you handle authentication via JWT tokens
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the recipe ');
      }

      toast({
        title: 'Recipe deleted.',
        description: "The recipe has been successfully deleted.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate("/dashboard");
      // Optionally, refresh the data or redirect user
    } catch (error) {
      console.error('Error deleting the recipe:', error);
      toast({
        title: 'Error',
        description: "Failed to delete the recipe front.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (

    <Tooltip label="Delete">
    <IconButton
      icon={<Icon as={FaBroom} />}
      colorScheme='red'
      variant="outline"
      size="sm"
      onClick={handleDelete}
    />
    
    
  </Tooltip>
   
  );
};

export default DeleteRecipeButton;
