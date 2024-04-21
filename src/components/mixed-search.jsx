import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { FaSearch, FaAppleAlt, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import { SearchRecipeComponentExternal } from './search-recipe-component';// General recipe search
import IngredientSearch from './sugg-temp'; // Ingredient search
import RecipeSearchByIngredients from './recip-ing';
import Blog from './tempo-blog';
import FoodVideoSearch from './video-feed';



const MotionBox = motion(Box);

const MixedSearchComponent = () => {
  const [searchType, setSearchType] = useState('ingredient'); // 'general' or 'ingredient'

  // Animation settings for Framer Motion
  const animationVariants = {
    initial: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
  };

  return (
    
    <Container maxW="7xl" py={10} position="relative">
      <VStack spacing={5} position="sticky" top={1} bg={useColorModeValue('gray.100', 'gray.700')} zIndex="relative" p={4}>
        <Heading as="h1" size="xl">
          Advanced Recipe Search
        </Heading>
        <Flex>
        <Tooltip label="Ingredient Search" hasArrow>
            <IconButton
              aria-label="Search by Ingredients"
              icon={<FaAppleAlt />}
              size="lg"
              colorScheme={searchType === 'ingredient' ? 'teal' : 'gray'}
              onClick={() => setSearchType('ingredient')}
              m={2}
            />
          </Tooltip>
          <Tooltip label="General Search" hasArrow>
            <IconButton
              aria-label="Search Recipes"
              icon={<FaSearch />}
              size="lg"
              colorScheme={searchType === 'general' ? 'teal' : 'gray'}
              onClick={() => setSearchType('general')}
              m={2}
            />
          </Tooltip>
         
          <Tooltip label="Learn more about food recipes online" hasArrow>
            <IconButton
              aria-label="Info"
              icon={<FaInfoCircle />}
              size="lg"
              variant="ghost"
              onClick={() => setSearchType('videos')}
              m={2}
            />
          </Tooltip>
        </Flex>
      </VStack>
      <AnimatePresence>
        <MotionBox
          key={searchType}
          variants={animationVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          mt={6} // Ensure space between the sticky header and content
        >
          {searchType === 'general' ? (
            <Box>
              <Text fontSize="xl">Use the general search to find recipes by name, cuisine, or other general criteria.</Text>
              <SearchRecipeComponentExternal />
            </Box>
          ) : searchType === 'ingredient' ? (
            <Box>
              <Text fontSize="xl">Use the ingredient search to find recipes based on specific ingredients you have.</Text>
              <RecipeSearchByIngredients/>
              
              
            </Box>
          ) : (
            <Box>
              <Text fontSize="xl">Use the video search to find recipes based on specific ingredients you have.</Text>   
              <FoodVideoSearch/>
              
            </Box>
          )}
        </MotionBox>
      </AnimatePresence>
    </Container>
  );
};

export default MixedSearchComponent;
