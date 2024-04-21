import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    VStack,
    Heading,
    IconButton,
    useColorMode,
    useColorModeValue,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Link,
} from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';

import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CreateRecipeComponent from './create-recipe-component';
import UpdateProfileComponent from './update-profile-component';
import CreateRecipe from './create-recipe';
import OwnRecipes from './own-recipies-component';
import SavedRecipe from './saved-recipe';
import RecipeFeedComponent from './recipe-feed-component';
import MealPlanGenerator from './meal-planner';
import { SearchRecipeComponentExternal } from './search-recipe-component';
import MixedSearchComponent from './mixed-search';
const MotionFlex = motion(Flex);
const gradientAnimation = keyframes`
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
`;

const DashboardComponent = () => {
    const [currentView, setCurrentView] = useState('recipefeed');
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const animation = keyframes`
    to {
      background-position: 200% center;
    } 
  `
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleNavClick = (view) => {
        setCurrentView(view);
        onClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
        onClose();
    };

    const pageVariants = {
        initial: { opacity: 0, x: -200, scale: 0.8 },
        in: { opacity: 1, x: 0, scale: 1 },
        out: { opacity: 0, x: 200, scale: 1.2 }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5
    };
    const animatedGradient = {
        bgGradient: 'linear(to-l, #9A1BB2, #F54D70)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
    };
    return (
        <Flex direction="column" minHeight="100vh" bgGradient="linear(to-b, #FFFFFF, #E0E0E0)">
        <Flex
            p={4}
            align="center"
            justify="space-between"
            sx={{
                ...animatedGradient,
                backgroundImage: 'linear-gradient(270deg, #9A1BB2, #F54D70)'
            }}
        >
            <IconButton
                ref={btnRef}
                icon={<FiMenu />}
                variant="ghost"
                aria-label="Open menu"
                onClick={onOpen}
                color="white"
            />
            <Heading size="md" color="white" as={Link} to="/dashboard">
                Dashboard
            </Heading>
            
        </Flex>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent bgGradient="linear-gradient(270deg, #9A1BB2, #F54D70)">
                    <DrawerCloseButton />
                    <DrawerHeader color="white">Menu</DrawerHeader>

                    <DrawerBody>
                        <VStack align="start">
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('mixedSearch')}>Mixed Search</Button>
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('recipefeed')}>Recipe Feed</Button>
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('updateProfile')}>Update Profile</Button>
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('MealPlanGenerator')}>MealPlanGenerator</Button>
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('createRecipe')}>Create Recipe</Button>
                            <Button w="full" justifyContent="flex-start" onClick={() => handleNavClick('ownRecipes')}>Own Recipes</Button>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="ghost" mr={3} onClick={onClose} color="white">
                            Close
                        </Button>
                        <Button colorScheme="red" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Content Area */}
            <MotionFlex flex={1} p={4} bg="gray.200" justify="center" align="center"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
            >
                <Box w="100%">
                    {currentView === 'dashboard' && <CreateRecipeComponent />}
                    {currentView === 'updateProfile' && <UpdateProfileComponent />}
                    {currentView === 'createRecipe' && <CreateRecipe />}
                    {currentView === 'ownRecipes' && <OwnRecipes />}
                    {currentView === 'MealPlanGenerator' && <MealPlanGenerator />}
                    {currentView === 'recipefeed' && <RecipeFeedComponent />}
                    {currentView === 'mixedSearch' && <MixedSearchComponent />}
                </Box>
            </MotionFlex>

            {/* Footer (Optional) */}
            <Flex p={4} justify="center" bgGradient='linear(to-r, #373e40, #1e282c)'>
                <Text>© 2024 Nouha Lamrani</Text>
            </Flex>
        </Flex>
    );
};

export default DashboardComponent;
