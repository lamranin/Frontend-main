import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  VStack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text
} from '@chakra-ui/react';
import { recipeFromIngredients, fetchRecipeById, IngredientSuggestion } from '../script/helper';
import RecipeArticlePage from './recipe-article';
import { AutoComplete } from 'primereact/autocomplete';
import DietaryRestrictionsDisplay from './dietary-display.jsx';
const RecipeSearchByIngredients = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showArticle, setShowArticle] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleSearch = async () => {
    try {
      const recipesFound = await recipeFromIngredients({ ingredients });
      setRecipes(recipesFound);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };
  const search = async (event) => {
    const query = event.query;
    setInputValue(query);

    try {
      const result = await IngredientSuggestion({ query });
      setSuggestions(result || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedIngredient = (event) => {
    const newIngredient = event.value;
    if (!selectedIngredients.some(ingredient => ingredient.name === newIngredient.name)) {
      setSelectedIngredients([...selectedIngredients, newIngredient]);
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient.name !== ingredientToRemove.name));
  };
  const handleSelectRecipe = async (recipeId) => {
    try {
      const details = await fetchRecipeById(recipeId);
      setRecipeDetails(details);
      setShowArticle(true);  // Show the article page when details are fetched
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  };

  const closeArticle = () => {
    setShowArticle(false);
  };
  const fetchRecipes = async () => {
    const ingredientList = selectedIngredients.map(ing => ing.name).join(',');
    try {
      const result = await recipeFromIngredients({ ingredients: ingredientList });
      setRecipes(result || []);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };

  const suggestionTemplate = (suggestion) => {
    return (
      <Flex align="center" py={2}>
        <Image
          src={`https://img.spoonacular.com/ingredients_100x100/${suggestion.image}`}
          alt={suggestion.name}
          mr={4}
          boxSize="50px"
          objectFit="cover"
          borderRadius="full"
        />
        <Text>{suggestion.name}</Text>
      </Flex>
    );
  };
  return (
    <Container maxW="7xl" py={10}>
      <VStack spacing={4}>
        <Heading as="h2" size="xl">Search Recipes by Ingredients</Heading>
        <Flex>
        <AutoComplete
          value={inputValue}
          suggestions={suggestions}
          completeMethod={search}
          field="name"
          size="2xl"
          dropdown
          itemTemplate={suggestionTemplate}
          placeholder="Search for ingredients..."
          onSelect={handleSelectedIngredient}
        />
        
        <Button colorScheme="blue" onClick={fetchRecipes}>Search Recipes</Button>
        
        </Flex>
        <Flex wrap="wrap" mt={4}>
        {selectedIngredients.map((ingredient, index) => (
          <Tag size="lg" key={index} borderRadius="full" variant="solid" colorScheme="green" m={1}>
            <TagLabel>{ingredient.name}</TagLabel>
            <TagCloseButton onClick={() => removeIngredient(ingredient)} />
          </Tag>
        ))}
      </Flex>
      <DietaryRestrictionsDisplay/>
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
  {recipes.map((recipe, index) => (
    <Box
      key={index}
      position="relative"
      borderWidth="2px"
      borderColor="purple.500"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      _hover={{ 
        '> div:last-of-type': { // Selects the last child div, which is the title container
          opacity: 1 // Shows the title on hover
        }
      }}
      transition="all 0.3s ease-in-out"
      onClick={() => handleSelectRecipe(recipe.id)}
    >
      <Image src={recipe.image} alt={recipe.title} boxSize="100%" objectFit="cover" />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="4"
        bgGradient="linear(to-t, purple.800, transparent)"
        opacity="0" // Initially hidden
        transition="opacity 0.3s ease-in-out"
        borderBottomRadius="lg"
      >
        <Heading fontSize="lg" fontWeight="bold" color="white" textAlign="center">
          {recipe.title}
        </Heading>
      </Box>
    </Box>
  ))}
</SimpleGrid>


      </VStack>
      {showArticle && recipeDetails && (
        <RecipeArticlePage recipeDetails={recipeDetails} isOpen={showArticle} onClose={closeArticle} />
      )}
    </Container>
  );
};

export default RecipeSearchByIngredients;
