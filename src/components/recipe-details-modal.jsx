import React, { useEffect, useState } from 'react';
import { Box, Text, Tag, Image, VStack, Divider, Avatar, HStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

import { fetchRecipeDetails } from '../script/helper'; // Adjust the import path as necessary
import { format } from 'date-fns';
import DOMPurify from 'dompurify';

const RecipeDetailsModal = ({ isOpen, onClose, recipeId }) => {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [cleanContent, setCleanContent] = useState('');
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            fetchRecipeDetails(recipeId)
                .then(data => {
                    setRecipeDetails(data);
                    setCleanContent(DOMPurify.sanitize(data.recipe.content));
                })
                .catch(error => {
                    toast({
                        title: 'Error',
                        description: 'Failed to load recipe details',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                })
                .finally(() => setIsLoading(false));
        }
    }, [isOpen, recipeId, toast]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" onEsc={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Recipe Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : recipeDetails ? (
                        <VStack align="start" spacing={4}>
                            <Text fontSize="2xl" fontWeight="bold">{recipeDetails.recipe.title}</Text>
                            <HStack>
                                <Text fontSize="sm">{format(new Date(recipeDetails.recipe.createdAt), 'PPP')}</Text>
                                <Tag colorScheme="blue">{recipeDetails.recipe.category.name}</Tag>
                                <Text fontSize="sm">- {recipeDetails.recipe.author.person.name}</Text>

                            </HStack>
                            <Text fontSize="sm">({recipeDetails.recipe.comments.length} user saved this recipe!)</Text>
                            <Divider />
                            <VStack align="start" spacing={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold">Ingredients</Text>
                                <Text>{recipeDetails.recipe.ingredientRecords.map((ingredient) => (
                                    <Text key={ingredient.id} fontSize="md" fontWeight="medium">{ingredient.ingredient.name} - {ingredient.quantity} {ingredient.unit}</Text>
                                ))}</Text>

                            </VStack>
                            <Divider />

                            {recipeDetails.recipe.images.map((image) => (
                                <Image key={image.id} src={image.imageUrl} alt="Recipe Image" boxSize="100%" objectFit="fill" my={2} />
                            ))}

                            <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
                            <Divider />
                            <Text fontSize="lg" fontWeight="bold">Comments</Text>
                            {recipeDetails.recipe.comments.length > 0 && (
                                <VStack align="start" divider={<Divider />} spacing={4} w="100%">
                                    {recipeDetails.recipe.comments.map((comment) => (
                                        <Box key={comment.id} w="100%">
                                            <HStack spacing={3}>
                                                <Avatar name={comment.user.person.name} size="sm" />
                                                <Text fontWeight="medium">{comment.user.person.name}</Text>
                                                <Text fontSize="xs" color="gray.500">{format(new Date(comment.createdAt), 'PPP, p')}</Text>

                                            </HStack>
                                            <Text ml={12} mt={1}>{comment.text}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    ) : (
                        <Text>Recipe details not available.</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RecipeDetailsModal;
