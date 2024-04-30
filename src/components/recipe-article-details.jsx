import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Stack,
  Heading,
  Divider,
  VStack,
  Link,
  useColorModeValue,
  chakra
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  MdRestaurantMenu,
  MdTimer,
  MdFavorite,
  MdHealthAndSafety,
  MdAttachMoney
} from 'react-icons/md';
import { FaLeaf, FaRegThumbsUp, FaWineBottle } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionIcon = motion(chakra.icon);

const MiniRecipe = ({ recipe }) => {
  const bgGradient = useColorModeValue('linear(to-bl, teal.300, green.200)', 'linear(to-bl, teal.700, green.600)');

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    whileHover: { scale: 1.03 }
  };

  const iconVariants = {
    initial: { scale: 0 },
    enter: { rotate: 360, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <MotionBox variants={cardVariants} initial="initial" animate="enter" whileHover="whileHover"
      padding="4" bg={bgGradient} borderRadius="lg" boxShadow="xl" maxWidth="md">
      
      <MotionImage variants={iconVariants} borderRadius="md" src={recipe.image} alt={recipe.title} objectFit="cover" />

      <VStack align="stretch" mt="3" p="2" bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.800')} borderRadius="lg">
        <Heading size="md" as="h3" noOfLines={1}>{recipe.title}</Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>{recipe.summary.replace(/<[^>]+>/g, '')} </Text>

        <Divider my="2" />

        <Stack direction="row" wrap="wrap" spacing="2">
          {recipe.diets.map(diet => (
            <Badge key={diet} colorScheme="purple" variant="solid">
              <MotionIcon as={FaLeaf} variants={iconVariants} mr="1" />{diet}
            </Badge>
          ))}
          {recipe.dishTypes.map(type => (
            <Badge key={type} colorScheme="orange" variant="solid">
              <MotionIcon as={MdRestaurantMenu} variants={iconVariants} mr="1" />{type}
            </Badge>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>
          <MotionIcon as={MdTimer} variants={iconVariants} />
          <Text fontSize="sm"><strong>Cooking Time:</strong> {recipe.readyInMinutes} mins</Text>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>
          <MotionIcon as={MdFavorite} color="pink.400" variants={iconVariants} />
          <Text fontSize="sm"><strong>Health Score:</strong> {recipe.healthScore}/100</Text>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>
          <MotionIcon as={MdAttachMoney} color="green.500" variants={iconVariants} />
          <Text fontSize="sm"><strong>Cost Per Serving:</strong> ${recipe.pricePerServing.toFixed(2)}</Text>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={4}>
          <MotionIcon as={FaRegThumbsUp} color="blue.400" variants={iconVariants} />
          <Text fontSize="sm"><strong>Likes:</strong> {recipe.aggregateLikes}</Text>
        </Stack>

        <Divider my="2" />

        <Stack direction="row" alignItems="center" spacing={4}>
          <MotionIcon as={GiCookingPot} color="yellow.400" variants={iconVariants} />

          <Text fontSize="sm"><strong>Servings:</strong> {recipe.servings}</Text>
          </Stack>
  
          {recipe.winePairing?.pairedWines && (
            <Stack direction="row" alignItems="center" spacing={4}>
              <MotionIcon as={FaWineBottle} color="red.400" variants={iconVariants} />
              <Text fontSize="sm"><strong>Wine Pairing:</strong> {recipe.winePairing.pairingText}</Text>
            </Stack>
          )}
  
          <Link href={recipe.sourceUrl} isExternal textDecoration="underline" color="blue.500">
            Full Recipe on Foodista
          </Link>
        </VStack>
      </MotionBox>
    );
  };
  
  export default MiniRecipe;
  