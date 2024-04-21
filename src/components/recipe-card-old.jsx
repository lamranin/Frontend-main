import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Badge, Stack, Button, Icon, useToast, useDisclosure, chakra, shouldForwardProp } from '@chakra-ui/react';
import { FaComment, FaArrowDown } from 'react-icons/fa'; // Importing icons
import { saveRecipe } from '../script/helper';
import { useNavigate } from 'react-router-dom';
import CommentModal from './comment-modal';
import RecipeDetailsModal from './recipe-details-modal';
import {motion, isValidMotionProp} from 'framer-motion';

const ChakraBox = chakra(motion.div, {
   shouldForwardProp : (prop) => isValidMotionProp(prop) || shouldForwardProp(prop) 
});
const RecipeCard = ({ recipe, ownRecipe = false }) => {
    const [hasSaved, setHasSaved] = useState(false);
    const navigate = useNavigate();
    const [savedByUsersCount, setSavedByUsersCount] = useState(recipe.savedByUsers.length ?? 0);
    const [commentCount, setCommentCount] = useState(recipe.comments.length ?? 0);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isCommentModalOpen,
        onOpen: onCommentModalOpen,
        onClose: onCommentModalClose,
    } = useDisclosure();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('User ID:', recipe.savedByUsers);
        const isSaved = recipe.savedByUsers.some(user => user.userId === userId);
        setHasSaved(isSaved);
    }, [recipe.savedByUsers]);
    const toast = useToast();
    const handleSave = async () => {
        try {
            const response = await saveRecipe(recipe.id);
            if (response) {
                setHasSaved(!hasSaved);
                setSavedByUsersCount(savedByUsersCount + (hasSaved ? -1 : 1));
                toast({
                    title: !hasSaved ? 'Saved Recipe' : 'Removed Recipe',
                    description: !hasSaved ? 'Recipe Saved successfully.' : 'Recipe Removed successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/")
            }
        } catch (error) {
            console.error("Error saving recipe:", error);
        }
    };

    return (

        <Stack  maxW="sm" borderWidth="2px" borderRadius="lg" overflow="hidden" p={5} m={2} justifyContent={"space-between"}>
            {recipe.images && recipe.images.length > 0 && (
                <Stack>
                    <Image width={"90%"} src={recipe.images[0].imageUrl} alt={`Image of ${recipe.title}`} margin={"auto"} />
                </Stack>
            )}

            <Stack>
                <Box  display="flex" alignItems="baseline" >
                    {recipe.category && (
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                            {recipe.category.name}
                        </Badge>
                    )}
                </Box>
                <Box bgGradient ="linear(to-l, #7928CA, #FF0080)" mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {recipe.title}
                </Box>
                {/* <Text mt={2}>{recipe.content.substring(0, 100)}...</Text> */}
                <Stack direction="row" spacing={4} align="center" mt={4}>
                    {recipe.hashtags.map((hashtag, index) => (
                        <Badge key={index} colorScheme="green">{hashtag.name}</Badge>
                    ))}
                </Stack>
            </Stack>
            {/* Optionally add actions like view, edit, delete */}
            <Stack  direction={"row"} justifyContent={"space-between"} verticalAlign={"center"} >
                <Stack>
                    <Button mt={4} colorScheme="blue" size="sm" onClick={onCommentModalOpen}>View Recipe</Button>
                    <RecipeDetailsModal isOpen={isCommentModalOpen} onClose={onCommentModalClose} recipeId={recipe.id} />
                </Stack>

                <Stack direction={"row"} mt={4} spacing={4} align="center" style={{ bottom: 0 }}>
                    <Button leftIcon={<Icon as={FaComment} />} colorScheme="teal" variant="outline" size="sm" onClick={onOpen}>
                        {commentCount}
                    </Button>
                    <CommentModal isOpen={isOpen} onClose={onClose} recipeId={recipe.id} commentCount={commentCount} setCommentCount={setCommentCount} />
                    <Button
                        leftIcon={<Icon as={FaArrowDown} />}
                        colorScheme={hasSaved ? "pink" : "gray"}
                        fill={hasSaved ? "pink" : "gray"}
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                    >
                        {savedByUsersCount}
                    </Button>
                </Stack>
            </Stack>

        </Stack>
    );
};

export default RecipeCard;
