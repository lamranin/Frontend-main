import React, { useState, useToast, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
  SimpleGrid,
  Flex
} from '@chakra-ui/react'

import RecipeCard from './recipe-card';

import { searchRecipe } from '../script/helper';

function Profile(){
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contactNumber: '',
    bio: '',
    profilePicture: '',
    address: '',
    dateOfBirth: new Date().toISOString().split('T')[0],
});
const toast = useToast()

const [IBlogTags, setBlogTags]= useState({
    tags: '',
    marginTop: ['marginTop']
  }); 

}


/*const [props] = useState({
  marginTop: number,
  tags: any
});
*/
const BlogTags = (props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

/*const [BlogAuthorProps] {
  date: Date,
  name: string
}
*/

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src=""
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}



function ArticleList() {
  const [recipes, setRecipes] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedRecipeType, setSelectedRecipeType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    searchRecipe(searchItem === '' ? 'all' : searchItem, selectedIngredient, selectedRecipeType, currentPage)
      .then((data) => setRecipes(data.recipes))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [selectedIngredient, selectedRecipeType, currentPage]);

  const handleSearch = async (event) => {
    const { value } = event.target;
    setSearchItem(value);
    setCurrentPage(1);
  };

  const handleSelectedIngredient = async (event) => {
    const { value } = event.target;
    setSelectedIngredient(value);
    setCurrentPage(1);
  };

  const handleSelectedRecipeType = async (event) => {
    const { value } = event.target;
    setSelectedRecipeType(value);
    setCurrentPage(1);
  };

  return (
    <Container maxW="7xl" p="12">
      <Heading as="h1" fontSize="4xl" mb="8">
        Food Blog Posts
      </Heading>
      <Box mb="8">
        <Flex flexDir={{ base: 'column', md: 'row' }}>
          <Box flex="1" mr={{ base: '0', md: '8' }} position="relative">
            <Image
              borderRadius="lg"
              src="https://media.cnn.com/api/v1/images/stellar/prod/160929101749-essential-spanish-dish-paella-phaidon.jpg?q=w_1900,h_1069,x_0,y_0,c_fill/h_618"
              alt="Food Image"
              objectFit="cover"
              w="full"
              h={{ base: 'auto', md: '80' }}
              mb="4"
            />
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              h="full"
              position="absolute"
              w="full"
              top="0"
              left="0"
            />
          </Box>
          <Box flex="1">
            <HStack spacing="2" mb="4">
              <Tag size="sm" variant="solid" colorScheme="orange">
                Burgers
              </Tag>
              <Tag size="sm" variant="solid" colorScheme="orange">
                American
              </Tag>
            </HStack>
            <Heading as="h2" fontSize="xl" mb="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Blog Article Title
              </Text>
            </Heading>
            <Text fontSize="lg" mb="4">
              Here's a delicious recipe for homemade burgers! These juicy beef burgers are perfect for a weekend barbecue or a family dinner. Serve them with your favorite toppings and enjoy!
            </Text>
            <Flex alignItems="center">
              <Image
                borderRadius="full"
                boxSize="40px"
                src=""
                alt="Avatar"
                mr="2"
              />
              <Text fontWeight="medium">John Doe</Text>
              <Text ml="2">— April 6, 2024</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Heading as="h2" fontSize="2xl" mb="6">
        Latest Articles
      </Heading>
      <Divider mb="6" />
      <Wrap spacing="6">
        <WrapItem flex="1">
          <Box w="full">
            <Box borderRadius="lg" overflow="hidden" mb="4">
              <Image
                transform="scale(1.0)"
                src="https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg"
                alt="Chicken Tikka Masala"
                objectFit="cover"
                w="full"
                h="56"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: 'scale(1.05)',
                }}
              />
            </Box>
            <HStack spacing="2" mb="2">
              <Tag size="sm" variant="solid" colorScheme="orange">
                Chicken
              </Tag>
              <Tag size="sm" variant="solid" colorScheme="orange">
                Lunch
              </Tag>
            </HStack>
            <Heading as="h3" fontSize="lg" mb="2">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Some Blog Title
              </Text>
            </Heading>
            <Text fontSize="md" mb="2">
              Check out this delicious recipe for chicken tikka masala! It's a classic Indian dish made with tender chicken, aromatic spices, and creamy tomato sauce. Serve it with rice or naan bread for a satisfying meal.
            </Text>
            <Flex alignItems="center">
              <Image
                borderRadius="full"
                boxSize="40px"
                src=""
                alt="Avatar"
                mr="2"
              />
              <Text fontWeight="medium">John Doe</Text>
              <Text ml="2">— April 6, 2024</Text>
            </Flex>
          </Box>
        </WrapItem>
        {recipes.length > 0 ? (
          <Box flex="1">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
              {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <Box flex="1">
            <Text>No recipes found.</Text>
          </Box>
        )}
      </Wrap>
      <VStack mt="10" spacing="6" alignItems="flex-start">
        <Heading as="h2" fontSize="2xl">
          What We Write About
        </Heading>
        <Text fontSize="lg">
          In our food blog, we cover a wide range of topics related to cooking, baking, and food culture. Whether you're a seasoned chef or just starting out in the kitchen, our blog has something for everyone. Explore our articles to discover new recipes, learn about different cuisines, and improve your cooking skills.
        </Text>
      </VStack>
    </Container>
  );
}

export default ArticleList;
