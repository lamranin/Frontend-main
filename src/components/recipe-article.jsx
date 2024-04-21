import React from 'react';
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
  Tooltip
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RecipeArticlePage = ({ recipeDetails, isOpen, onClose }) => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue('white', 'gray.700');
    const accentColor = useColorModeValue('purple.500', 'purple.200');

    if (!isOpen) return null;

    return (
        <Box position="fixed" inset="0" bg="gray.100" overflowY="auto">
            <Container maxW="container.xl" py="12">
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
                    <Box bg={bgColor} shadow="lg" p={6} rounded="lg" borderWidth="1px" borderColor={accentColor}>
                        <Heading size="lg" mb={4}>Summary</Heading>
                        <Text dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                    </Box>
                    {recipeDetails.extendedIngredients && (
                        <Box bg={bgColor} shadow="lg" p={6} rounded="lg" borderWidth="1px" borderColor={accentColor}>
                            <Heading size="lg" mb={4}>Ingredients</Heading>
                            <List spacing="3">
                                {recipeDetails.extendedIngredients.map((ingredient) => (
                                    <Tooltip label={ingredient.original} hasArrow bg={accentColor} color="white">
                                        <ListItem key={ingredient.id} _hover={{ bg: accentColor, color: 'white', borderRadius: 'md', cursor: 'pointer', transition: 'all 0.3s' }}>
                                            {ingredient.original}
                                        </ListItem>
                                    </Tooltip>
                                ))}
                            </List>
                        </Box>
                    )}
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
