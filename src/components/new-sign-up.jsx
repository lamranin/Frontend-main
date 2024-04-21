import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  VStack,
  Image,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import RecipeSearchByIngredients from './recip-ing'; // Make sure this component's styling aligns with the landing page.
import { signIn } from '../script/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Assuming signIn is a function that authenticates a user
    try {
      const user = { email, password };
      // Mock function for demonstration
      const isAuthenticated = await signIn(user); // Simulate successful authentication
      if (isAuthenticated) {
        navigate('/dashboard'); // Redirect to dashboard upon successful login
      } else {
        console.error('Authentication failed');
        // Handle login failure
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      bgGradient="linear(to-br, orange.100, purple.300)"
      w="full"
    >
      <Container maxW="container.xl" p={4} centerContent>
        <Stack direction={{ base: 'column', md: 'row' }} spacing="10" mt="10" mb="10" align="center" w="full">
          <VStack
            spacing={4}
            align="flex-start"
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            rounded="lg"
            shadow="xl"
            w="full"
            maxW="md"
          >
            <Heading as="h2" size="xl" color="teal.400">
              Sign In
            </Heading>
            <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.200')}>
              Sign in to continue to your food journey.
            </Text>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
            />
            <Button
              bgGradient="linear(to-r, teal.500, green.500)"
              color="white"
              onClick={handleLogin}
              _hover={{
                bgGradient: "linear(to-r, teal.600, green.600)",
              }}
              w="full"
            >
              Log In
            </Button>
            <Text pt={2}>
              New here? <Link color="teal.500" to="/signup">Sign up</Link>
            </Text>
          </VStack>
          <VStack spacing={5} w="full" maxW="md">
            <Image
              borderRadius="lg"
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Chef"
              boxSize="300px"
              objectFit="cover"
            />
            <Heading fontSize="lg" fontWeight="bold" textAlign="center">
              Join our community of food lovers!
            </Heading>
          </VStack>
        </Stack>
        <Divider my={5} />
        <Heading fontSize="lg" fontWeight="bold" textAlign="center">
              Feel free to try a simple recipe search before logging-in:
            </Heading>
        {/* Recipe Search By Ingredients Component Integration */}
        <RecipeSearchByIngredients />

        {/* Decorative and Informational Elements */}
        <Divider my={5} />
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Explore new recipes and culinary delights right from your kitchen.
        </Text>
      </Container>
    </Flex>
  );
};

export default LoginPage;