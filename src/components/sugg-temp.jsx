import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { AutoComplete } from 'primereact/autocomplete';
import { motion } from 'framer-motion';

import { IngredientSuggestion, recipeFromIngredients, recipeSummary, nutritionLabel } from '../script/helper';

const MotionBox = motion(Box);

const IngredientSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [nutValue, setNutValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selectedId) {
      recipeSummary(selectedId)
        .then(data => setRecipeDetails(data))
        .catch(error => console.error('Failed to fetch recipe details:', error));

      nutritionLabel(selectedId)
        .then(data => setNutValue(data))
        .catch(error => console.error('Failed to fetch nutrition details:', error));
    }
  }, [selectedId]);

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
  const handleViewRecipe = (id) => {
    setSelectedId(id);
    onOpen();
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
      <Stack direction={['column', 'row']} spacing={8} align="flex-start">
        <AutoComplete
          value={inputValue}
          suggestions={suggestions}
          completeMethod={search}
          field="name"
          size="lg"
          dropdown
          itemTemplate={suggestionTemplate}
          placeholder="Search for ingredients..."
          onSelect={handleSelectedIngredient}
        />
        <Button colorScheme="blue" onClick={fetchRecipes}>Search Recipes</Button>
      </Stack>

      <Flex wrap="wrap" mt={4}>
        {selectedIngredients.map((ingredient, index) => (
          <Tag size="lg" key={index} borderRadius="full" variant="solid" colorScheme="green" m={1}>
            <TagLabel>{ingredient.name}</TagLabel>
            <TagCloseButton onClick={() => removeIngredient(ingredient)} />
          </Tag>
        ))}
      </Flex>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="xl" mb={4}>
          Recipe Suggestions
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          {recipes.map((recipe, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md">
              <Image src={recipe.image} alt={recipe.title} w="100%" h="200px" objectFit="cover" />
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {recipe.title}
                </Heading>
                <Button colorScheme="teal" onClick={() => handleViewRecipe(recipe.id)}>View Recipe</Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </MotionBox>

      {/* Modal for Recipe Summary */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{recipeDetails ? recipeDetails.title : ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {recipeDetails ? (
              <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
            ) : 'Loading...'}
            {nutValue ? (
              <Image src={nutValue} alt="Nutritional Label" boxSize="300px" m={4} />
            ) : (
              <Text mt={4}>No nutritional label available.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default IngredientSearch;
