import React, { useState, useEffect, useMemo } from 'react';
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
import Particles, {initParticlesEngine} from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim"; 
import pattern from './Assets/new_pattern.png';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = (container) => {
    console.log(container);
  };
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#800080",
        },
        opacity:"30%"
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "random",
        },
        links: {
          color: "random",
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 60,
        },
        opacity: {
          value: 0.35,
        },
        "shape": {
          "type": [
            
            "emoji"
          ],
          "options": {
            "emoji": {
              "particles": {
                "size": {
                  "value": 24
                }
              },
              "value": [
                "🥐",
                "🍋",
                "🥦",
                "🌰",
                "🥨",
                "🥯",
                "🥞",
                "🧀",
                "🍗",
                "🍕",
                "🌯",
                "🥚",
                "🍫",
                "🍏",
                "🍒",
                "🥑",
                "🍈",
                "🧅",
                "🥩",
                "🥔",
                "🥛",
                "🥯",
                "🧈",
                "🥖"
              ]
            }
          }
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );
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
      bgImage={pattern} bgRepeat="repeat"  bgPosition="center"
      
    >
       <Particles width="100vw" height="100vh" style={{ position: 'absolute', top: 0, left: 0 }} particlesLoaded={particlesLoaded} options={options} />
      <Container maxW="container.xl" p={4} centerContent >
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