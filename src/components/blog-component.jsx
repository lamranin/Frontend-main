import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Container,
  VStack,
  SimpleGrid,
  Flex,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import RecipeCard from './recipe-card';
import { searchRecipe } from '../script/helper';

function ArticleList() {
  const [recipes, setRecipes] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedRecipeType, setSelectedRecipeType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    searchRecipe(searchItem || 'all', selectedIngredient, selectedRecipeType, currentPage)
      .then(data => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
        toast({
          title: 'Error loading recipes',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, [searchItem, selectedIngredient, selectedRecipeType, currentPage, toast]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container maxW="7xl" p="12">
      <Heading as="h1" fontSize="4xl" mb="8">Food Blog Posts</Heading>
      <Flex flexDirection="column" gap="4">
        {/* Hero Section */}
        <Flex direction={{ base: 'column', md: 'row' }} mb="8">
          <Box flex="1" position="relative">
            <Image
              borderRadius="lg"
              src="https://media.cnn.com/api/v1/images/stellar/prod/160929101749-essential-spanish-dish-paella-phaidon.jpg?q=w_1900,h_1069,x_0,y_0,c_fill/h_618"
              alt="Feature dish"
              objectFit="cover"
              w="full"
              h={{ base: 'auto', md: '80' }}
            />
          </Box>
          <VStack flex="1" align="start" p="4">
            <Tag size="sm" colorScheme="orange">Featured</Tag>
            <Heading as="h2" fontSize="xl">The Art of Spanish Paella</Heading>
            <Text fontSize="md">Explore the traditional flavors and techniques of crafting the perfect Paella, a staple of Spanish cuisine.</Text>
          </VStack>
        </Flex>

        {/* Articles List */}
        <Heading as="h2" fontSize="2xl" mb="4">Latest Articles</Heading>
        <Divider mb="4" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
          {loading ? <Text>Loading...</Text> : recipes.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
          {!loading && recipes.length === 0 && <Text>No articles found.</Text>}
        </SimpleGrid>
      </Flex>
    </Container>
  );
}

export default ArticleList;
