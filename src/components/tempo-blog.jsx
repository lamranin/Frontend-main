import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  VStack,
  Grid,
  theme,
  Link,
  extendTheme
} from '@chakra-ui/react';


const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // Define more colors as needed
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
  },
});

function Blog() {
  return (
    <ChakraProvider theme={customTheme}>
      <Box textAlign="center" fontSize="xl">
        <Flex minH="100vh" p={3} direction="column" align="center" justify="center">
          
          <VStack spacing={8}>
            <Heading>Welcome to My Recipes</Heading>
            <Text>Explore hundreds of delicious recipes!</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image src="https://via.placeholder.com/150" alt="Recipe Image" />
                  <Box p={5}>
                    <Link textDecoration="none" _hover={{ textDecoration: 'underline' }}>
                      <Heading fontSize="xl">Recipe {index + 1}</Heading>
                    </Link>
                    <Text mt={4}>Delicious and easy to make recipes.</Text>
                  </Box>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default Blog;