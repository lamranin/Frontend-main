// src/pages/SignIn.js
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../script/auth.js";
import SearchIngredientComponent from "./search-ingredient-component.jsx";
import IngredientAutocomplete from "./ingredient-temp.jsx";
import IngredientSearch from "./sugg-temp.jsx";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from '@chakra-ui/react'

const avatars = [
  {
    name: 'Reeses',
    url: 'https://img.spoonacular.com/recipes/549137-312x231.jpg',
  },
  {
    name: 'Burgers',
    url: 'https://img.spoonacular.com/recipes/519137-312x231.jpg',
  },
  {
    name: 'Ice Cream',
    url: 'https://img.spoonacular.com/recipes/489137-312x231.jpg',
  },
  {
    name: 'Cake',
    url: 'https://img.spoonacular.com/recipes/511137-312x231.jpg',
  },
  {
    name: 'Steak',
    url: 'https://img.spoonacular.com/recipes/259137-312x231.jpg',
  },
]


const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const resetState = () => {
        setEmail("");
        setPassword("");
    }

    const onClickSignIn = async () => {
        const user = {
            email: email,
            password: password
        }
        const response = await signIn(user);
        if (response) {
            resetState();
            navigate("/dashboard");
        }

    };
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 10, lg: 10 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Food Aficionados{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              &
            </Text>{' '}
            Seasoned Cooks
          </Heading>
          <Stack direction={'row'} spacing={8} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
            
          </Stack>

          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Make a simple search{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              NOW
            </Text>
            
          </Heading>
          
          
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          maxH={{lg: 'lg'}}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Try it out
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Only have a few ingredients in your fridge? Enter the "MyFoodHelper"
              platform and make the most of what you have !
            </Text>
          </Stack>
          <Box as={'form'} mt={2}>
            <Stack spacing={10}>
              <Input
                placeholder="example@example.com"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type="email"
                onChange={(e) => { setEmail(e.target.value) }} value={email}

              />
              <Input
                placeholder="********"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                type="password"
                onChange={(e) => { setPassword(e.target.value) }} value={password}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              onClick={onClickSignIn}>
              Login
            </Button>
            <Text mt={4} textAlign="center">
                    Don't have an account? <Text as="span" color="teal.500" fontWeight="bold"><Link to="/signup">Sign Up</Link></Text>
                </Text>
          </Box>
          
          form
        </Stack>
        <Stack>
        <Box bg={'black.50'}>
            <IngredientSearch >
      
            </IngredientSearch>
          </Box>
        </Stack>
      </Container>
      <Blur position={'center'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
      
    
    </Box>
  )
}
