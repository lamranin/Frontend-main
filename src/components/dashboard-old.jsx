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
} from '@chakra-ui/react';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import CreateRecipeComponent from './create-recipe-component';
import { Link, useNavigate } from 'react-router-dom';
import UpdateProfileComponent from './update-profile-component';
import CreateRecipe from './create-recipe';
import OwnRecipes from './own-recipies-component';
import SavedRecipe from './saved-recipe';
import RecipeFeedComponent from './recipe-feed-component';
import { SearchRecipeComponentExternal } from './search-recipe-component';

const DashboardComponent = () => {
    const [currentView, setCurrentView] = useState('recipefeed');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleNavClick = (view) => {
        setCurrentView(view);
        onClose(); // Close the drawer
    };
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.100', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'gray.200');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login'); // Adjust the path as per your routing setup
        onClose(); // Assuming onClose is a function to close the drawer
    };

    return (
        <Flex bgGradient ="linear(to-l, #e96443, #904e95)" direction="column" minHeight="100vh" p={5}>
            {/* Navbar */}
            <Flex   p={4} align="center">
                <IconButton
                    ref={btnRef}
                    icon={<FiMenu />}
                    variant="outline"
                    aria-label="open menu"
                    onClick={onOpen}
                    mr={5}
                />
                <Box >
                <Heading size="md" color="black.100" flex={1}>
                    <Link to="/dashboard">Dashboard</Link>
                </Heading>
                </Box>
            </Flex>

            {/* Sidebar Drawer */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <VStack align="start" >
                            <Button color="blue.600"  w="full" justifyContent="flex-start" onClick={() => handleNavClick('externalSearch')}>Recipe Search</Button>
                            <Button color="red.600" w="full" justifyContent="flex-start" onClick={() => handleNavClick('recipefeed')}>Recipe Feed</Button>
                            <Button color="green.600" w="full" justifyContent="flex-start" onClick={() => handleNavClick('updateProfile')}>Update Profile</Button>
                            <Button color="purple.600" w="full" justifyContent="flex-start" onClick={() => handleNavClick('savedRecipes')}>Saved Recipe</Button>
                            <Button color="orange.600" w="full" justifyContent="flex-start" onClick={() => handleNavClick('createRecipe')}>Create Recipe</Button>
                            <Button color="pink.600" w="full" justifyContent="flex-start" onClick={() => handleNavClick('ownRecipes')}>Own Recipes</Button>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="red" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Content Area */}
            <Flex bgGradient='linear(#D3CCE3 25%, #E9E4F0 75%)' flex={1} direction="column" p={4} borderRadius={25} >
                {currentView === 'dashboard' && (
                    <VStack spacing={4} align="stretch">
                        <CreateRecipeComponent />

                    </VStack>
                )}
                {currentView === 'updateProfile' && (
                    <UpdateProfileComponent />
                )}
                {currentView === 'createRecipe' && (
                    <CreateRecipe />
                )}
                {currentView === 'ownRecipes' && (
                    <OwnRecipes />
                )}

                {currentView === 'savedRecipes' && (
                    <SavedRecipe />
                )}

                {currentView === 'recipefeed' && (
                    <RecipeFeedComponent />
                )}

                {currentView === 'externalSearch' && (
                    <SearchRecipeComponentExternal />
                )}
            </Flex>

            {/* Footer (Optional) */}
            <Flex  p={4} justify="center">
                <Text color="black">© 2024 Nouha Lamrani</Text>
            </Flex>
        </Flex>
    );
};

export default DashboardComponent;
