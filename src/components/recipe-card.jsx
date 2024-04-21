import React, { useState,useEffect } from 'react';
import {
  Box,
  Badge,
  Image,
  Stack,
  Button,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FaComment, FaArrowDown } from 'react-icons/fa';

import CommentModal from './comment-modal';
import { saveRecipe } from '../script/helper';
import { useNavigate } from 'react-router-dom';

import RecipeDetailsModal from './recipe-details-modal';
import {motion, isValidMotionProp} from 'framer-motion';


const RecipeCard = ({ recipe }) => {
    const [commentCount, setCommentCount] = useState(0);
    const [hasSaved, setHasSaved] = useState(false);
    const [savedByUsersCount, setSavedByUsersCount] = useState(0);
    const { isOpen: isRecipeModalOpen, onOpen: onRecipeModalOpen, onClose: onRecipeModalClose } = useDisclosure();
    const { isOpen: isCommentModalOpen, onOpen: onCommentModalOpen, onClose: onCommentModalClose } = useDisclosure();
  
    const handleSave = () => {
      setHasSaved(!hasSaved);
      setSavedByUsersCount(hasSaved ? savedByUsersCount - 1 : savedByUsersCount + 1);
    };
  
    return (
      <Box
        maxW="sm"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        m={2}
        justifyContent="space-between"
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
      >
        {recipe.images && recipe.images.length > 0 && (
          <Box>
            <Image src={recipe.images[0].imageUrl} alt={`Image of ${recipe.title}`} margin="auto" />
          </Box>
        )}
  
        <Stack>
          {recipe.category && (
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {recipe.category.name}
            </Badge>
          )}
          <Box
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {recipe.title}
          </Box>
          <Stack direction="row" spacing={4} align="center" mt={4}>
            {recipe.hashtags.map((hashtag, index) => (
              <Badge key={index} colorScheme="green">
                {hashtag.name}
              </Badge>
            ))}
          </Stack>
        </Stack>
  
        <Stack direction="row" justifyContent="space-between" verticalAlign="center">
          <Stack>
            <Button mt={4} colorScheme="blue" size="sm" onClick={onRecipeModalOpen}>
              View Recipe
            </Button>
            <RecipeDetailsModal isOpen={isRecipeModalOpen} onClose={onRecipeModalClose} recipeId={recipe.id} />
          </Stack>
  
          <Stack direction="row" mt={4} spacing={4} align="center" style={{ bottom: 0 }}>
            <Tooltip label="Comments">
              <IconButton
                icon={<Icon as={FaComment} />}
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={onCommentModalOpen}
              />
            </Tooltip>
            <CommentModal isOpen={isCommentModalOpen} onClose={onCommentModalClose} recipeId={recipe.id} commentCount={commentCount} setCommentCount={setCommentCount} />
  
            <Tooltip label="Saved">
              <IconButton
                icon={<Icon as={FaArrowDown} />}
                colorScheme={hasSaved ? 'pink' : 'gray'}
                variant="outline"
                size="sm"
                onClick={handleSave}
              />
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    );
  };
  
  export default RecipeCard;