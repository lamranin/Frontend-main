import React, {useEffect, useState, useMemo} from 'react';



import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Text,
  List,
  ListItem,
  VStack,
  useColorModeValue,
  useColorMode,
  Flex,
  HStack,
  useToast,
  Tooltip
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Particles, {initParticlesEngine} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import { nutritionLabel, fetchRecipeNutById, searchIngredients } from '../script/helper';

import pattern from './Assets/1297918.png';
const RecipeArticlePage = ({ recipeDetails, isOpen, onClose }) => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.700');
    const accentColor = useColorModeValue('purple.500', 'purple.200');
    const [selectedId, setSelectedID] = useState(recipeDetails.id);
    const [nutValue, setNutValue] = useState('');
    const [init, setInit] = useState(false);
    const [ings, setIngs] = useState([]);
    const [measurement, setMeasurement] = useState('metric'); // 'metric' or 'us'
    const toast = useToast();
    const toggleMeasurement = () => {
    setMeasurement(measurement === 'metric' ? 'us' : 'metric');
    toast({
      title: `Switched to ${measurement === 'metric' ? 'US' : 'Metric'} measurements`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

    useEffect(() => {
        if (selectedId) {
            fetchRecipeNutById(selectedId)
            .then(data => setNutValue(data))
            .catch(error => console.error('Failed to fetch nutrition details:', error));
            
            searchIngredients(selectedId)
            .then(data =>setIngs(data))
            .catch(error => console.error('Failed to fetch ingredient details:', error));

        }
      }, [selectedId]);

     
    if (!isOpen) return null;
    const IngredientComponent = ({ ings }) => {
        return (
            <VStack spacing={4} align="stretch">
              <Button onClick={toggleMeasurement} colorScheme="purple" size="lg">
                Switch to {measurement === 'metric' ? 'US' : 'Metric'} Measurements
              </Button>
              <List spacing={3}>
                {ings.ingredients?.map((ingredient) => (
                  <ListItem rounded="lg" bgColor={"gray.600"} key={ingredient.name}  _hover={{ bg:  'purple.700', transform: 'translateY(-2px)', shadow: 'lg' }}>
                    <HStack spacing={4}>
                      <Box position="relative" w="200px" h="200px">
                        <Image
                          borderRadius="full"
                          boxSize="full"
                          objectFit="cover"
                          src={`https://img.spoonacular.com/ingredients_500x500/${ingredient.image}`}
                          alt={ingredient.name}
                          loading="lazy"
                        />
                      </Box>
                      <Box flex="1" p={2}>
                        <Text fontSize="3xl" fontWeight="bold">{ingredient.name}</Text>
                        <Text fontSize="xl" color="while.500">
                          {measurement === 'metric'
                            ? `${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}`
                            : `${ingredient.amount.us.value} ${ingredient.amount.us.unit}`}
                        </Text>
                      </Box>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          );
    };
    return (
        
        <Box position="fixed" inset="0" bg="pink.900"  overflowY="auto" bgImage={pattern} bgRepeat="repeat"  bgPosition="center">
            <Container maxW="container.xl" py="12" >
           
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="xl" color={accentColor}>Recipe Details</Heading>
                    <Button colorScheme="purple" onClick={onClose}>
                        Close
                    </Button>
                </Flex>
                <Box bg={accentColor} p={6} mt={4} rounded="lg" shadow="xl">
                    <Heading textAlign="center" size="2xl" color="white">{recipeDetails.title}</Heading>
                    <Image
                        mx="auto"
                        src={recipeDetails.image}
                        alt="Recipe"
                        boxSize="300px"
                        mt={4}
                        mb={4}
                        borderRadius="full"
                        boxShadow="2xl"
                    />
                </Box>
                <VStack spacing={5} mt={5}>
                    <Box bg={bgColor} shadow="lg" p={6} rounded="lg" borderWidth="1px" borderColor={accentColor}>
                        <Heading size="lg" mb={4}>Nutritional Information</Heading>
                        
                        <Text fontSize="md" color="gold">Vegetarian: {recipeDetails.vegetarian ? 'Yes' : 'No'}</Text>
                        <Text fontSize="md" color="gold">Gluten Free: {recipeDetails.glutenFree ? 'Yes' : 'No'}</Text>
                        <Text fontSize="md" color="gold">Dairy Free: {recipeDetails.dairyFree ? 'Yes' : 'No'}</Text>
                        <Text fontSize="md" color="gold">Cheap: {recipeDetails.cheap ? 'Yes' : 'No'}</Text>
                        <Text fontSize="md" color="gold">Healthy: {recipeDetails.healthy ? 'Yes' : 'No'}</Text>
                        {/* Add more nutritional information here */}
                        
                    </Box>
                    <Box>
                            
                                    {nutValue ? (
                                <div dangerouslySetInnerHTML={ {__html: nutValue}}></div>
                                         ) : (
                        <Text mt={4}>No nutritional label available.</Text>
                                                 )}
                        </Box>
                    <Box bg={bgColor} shadow="lg" p={6} rounded="lg" borderWidth="1px" borderColor={accentColor}>
                        <Heading size="lg" mb={4}>Summary</Heading>
                        <Text dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                    </Box>
                   
                    <IngredientComponent ings={ings}/>
                    
                    {recipeDetails.analyzedInstructions?.[0] && (
                        <Box bg={bgColor} shadow="lg" p={6} rounded="lg" borderWidth="1px" borderColor={accentColor}>
                            <Heading size="lg" mb={4}>Instructions</Heading>
                            <List as="ol" styleType="decimal" spacing="3">
                                {recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
                                    <ListItem key={index}>{step.step}</ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                    
                    <Button colorScheme="purple" onClick={() => navigate('/write-article', {state:{recipeDetails:recipeDetails}})}>
                        Write Article on Recipe
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default RecipeArticlePage;
