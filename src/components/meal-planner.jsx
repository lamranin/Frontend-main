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
  Flex,
  Image
} from '@chakra-ui/react';

const MealPlanGenerator = () => {
  const [calories, setCalories] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const toast = useToast();

  const fetchMealPlan = async () => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${calories}`;
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
      <VStack spacing={4}>
        <Heading as="h1" size="lg">Daily Meal Plan Generator</Heading>
        <FormControl id="calories">
          <FormLabel>Enter your daily calorie target</FormLabel>
          <Input
            placeholder="Calories (e.g., 2000)"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={fetchMealPlan}>Generate Meal Plan</Button>
        {mealPlan && (
          <Flex direction="column" mt={4}>
            <Text fontSize="lg" fontWeight="bold">Your Meal Plan:</Text>
            <Box>
              <Text><strong>Breakfast:</strong> {mealPlan.meals[0].title}</Text>
              <Image src={mealPlan.meals[0].image} alt={mealPlan.meals[0].title} />
            </Box>
            <Box>
              <Text><strong>Lunch:</strong> {mealPlan.meals[1].title}</Text>
              <Image src={mealPlan.meals[1].image} alt={mealPlan.meals[1].title} />
            </Box>
            <Box>
              <Text><strong>Dinner:</strong> {mealPlan.meals[2].title}</Text>
              <Image src={mealPlan.meals[2].image} alt={mealPlan.meals[2].title} />
            </Box>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default MealPlanGenerator;
