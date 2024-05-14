import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Heading,
  SliderThumb,
  SliderMark,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Flex,
  Image
} from '@chakra-ui/react';
import DietaryRestrictionsDisplay from './dietary-display.jsx';
import {  fetchRecipeById} from '../script/helper';
import RecipeArticlePage from './recipe-article';
const MealPlanGenerator = () => {
  const [calories, setCalories] = useState(1500);
  const [mealPlan, setMealPlan] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showArticle, setShowArticle] = useState(false);
  const [sliderValue, setSliderValue] = useState(1500);
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'lg',
  }
  const toast = useToast();
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
  
  const fetchMealPlan = async () => {
    const restrictions = JSON.parse(localStorage.getItem('dietaryRestrictions') || '[]');
    const restrictionsQuery = restrictions.join(',');
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}&diet=${encodeURIComponent(restrictionsQuery)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch meal plan');
      const result = await response.json();
      setMealPlan(result);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to fetch meal plan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxW="600px" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto">
      <VStack spacing={16}>
        <Heading as="h1" size="lg">Daily Meal Plan Generator</Heading>
        <FormControl id="calories">
          <FormLabel>Enter your daily calorie target</FormLabel>
          
          <Slider aria-label='slider-ex-6'  defaultValue={1500}
      min={500}
      max={6000} onChange={(val) => setCalories(val)}>
        <SliderMark value={1000} {...labelStyles}>
          1000
        </SliderMark>
        <SliderMark value={2500} {...labelStyles}>
          2500
        </SliderMark>
        <SliderMark value={4500} {...labelStyles}>
          4500
        </SliderMark>
        <SliderMark
          value={calories}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {calories}
        </SliderMark>
        
        
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
          
        <SliderThumb />
      </Slider>
          
          
        </FormControl>
        <FormControl isRequired>
                    <FormLabel>Dietary Restrictions</FormLabel>
                    <DietaryRestrictionsDisplay
                        
                    />
                </FormControl>
        <Button colorScheme="pink" onClick={fetchMealPlan}>Generate Meal Plan</Button>
        
        {mealPlan && (
          <Flex direction="column" mt={4}>
            <Text fontSize="lg" fontWeight="bold">Your Meal Plan:</Text>
    <Box
      key={0}
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
      onClick={() => handleSelectRecipe(mealPlan.meals[0].id)}
    >
      <Image objectFit='cover' src={`https://img.spoonacular.com/recipes/${mealPlan.meals[0].id}-556x370.jpg`} alt={mealPlan.meals[0].title} />
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

      
              <Heading as="h2" size="xl" ><Heading>Breakfast:</Heading> {mealPlan.meals[0].title}</Heading>
              
              </Box>
            </Box>
            <Box
      key={1}
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
      onClick={() => handleSelectRecipe(mealPlan.meals[1].id)}
    >
      <Image objectFit='cover' src={`https://img.spoonacular.com/recipes/${mealPlan.meals[1].id}-556x370.jpg`} alt={mealPlan.meals[1].title} />
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
        <Heading as="h2" size="xl"><Heading>Lunch:</Heading> {mealPlan.meals[1].title}</Heading>
      </Box>
              
              
            </Box>
            <Box
      key={2}
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
      onClick={() => handleSelectRecipe(mealPlan.meals[2].id)}
    >
      <Image src={`https://img.spoonacular.com/recipes/${mealPlan.meals[2].id}-556x370.jpg`} alt={mealPlan.meals[2].title} />
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
      
              
              <Heading as="h2" size="xl"><Heading>Dinner:</Heading> {mealPlan.meals[2].title}</Heading>
              
            </Box>
            </Box>
          </Flex>
        )}
        {showArticle && recipeDetails && (
        <RecipeArticlePage recipeDetails={recipeDetails} isOpen={showArticle} onClose={closeArticle} />
      )}
      </VStack>
    </Box>
  );
};

export default MealPlanGenerator;
