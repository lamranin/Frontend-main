import React, { useState, useEffect, useMemo } from 'react';
import Burger from "./Assets/burger.png";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  VStack,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { MdHome, MdSettings, MdNoteAdd, MdMenu, MdOutlineNightlight, MdOutlineWbSunny, MdOutline3P, MdFreeBreakfast, MdFoodBank } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Particles, {initParticlesEngine} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

import UpdateProfileComponent from './update-profile-component';
import CreateRecipe from './create-recipe';
import OwnRecipes from './own-recipies-component';
import SavedRecipe from './saved-recipe';
import RecipeFeedComponent from './recipe-feed-component';
import MixedSearchComponent from './mixed-search';
import MealPlanGenerator from './meal-planner';
import ArticleList from './blog-component';

import pattern from './Assets/new_pattern.png';
const SidebarItem = ({ icon, children, ...rest }) => {
  return (
    <Button leftIcon={icon} justifyContent="start" variant="ghost" size="lg" w="full" {...rest}>
      {children}
    </Button>
  );
};

const DashboardComponent = () => {
  const [currentView, setCurrentView] = useState('recipefeed');
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const [init, setInit] = useState(false);
  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };
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
  return (
    <Flex minHeight="100vh" position="relative"  bgImage={pattern} bgRepeat="repeat"  bgPosition="center">
      <Particles width="100vw" height="100vh" style={{ position: 'absolute', top: 0, left: 0 }} particlesLoaded={particlesLoaded} options={options} />
      {displaySidebar && (
        <VStack w="250px" h="full" p="5" spacing="2" alignItems="flex-center" bg="gray.400" borderRightWidth="1px">
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'light' ? <MdOutlineWbSunny /> : <MdOutlineNightlight />}
            onClick={toggleColorMode}
            alignSelf="flex-end"
          />
          <Heading size="md">Dashboard</Heading>
          <SidebarItem icon={<MdHome />}  onClick={() => handleNavClick('recipefeed')}>Home</SidebarItem>
          <SidebarItem icon={<MdNoteAdd />} onClick={() => handleNavClick('mixedSearch')}>Search</SidebarItem>
          <SidebarItem icon={<MdFoodBank />} onClick={() => handleNavClick('blogPost')}>Blog Posts</SidebarItem>
          <SidebarItem icon={<MdOutline3P />} onClick={() => handleNavClick('updateProfile')}>Profile</SidebarItem>
          <SidebarItem icon={<MdNoteAdd />} onClick={() => handleNavClick('createRecipe')}>Create Recipe</SidebarItem>
          <SidebarItem icon={<MdFoodBank />} onClick={() => handleNavClick('MealPlanGenerator')}>Generate Meal Plan</SidebarItem>
          <SidebarItem icon={<MdFreeBreakfast />} onClick={() => handleNavClick('savedRecipes')}>Saved Recipes</SidebarItem>
       
          <Button colorScheme="red" onClick={handleLogout}>Log Out</Button>
        </VStack>
      )}
      <IconButton
        aria-label="Toggle sidebar"
        icon={<MdMenu />}
        onClick={() => setDisplaySidebar(!displaySidebar)}
        variant="ghost"
        m="4"
      />
      <Box flex="1" p="4">
        {currentView === 'recipefeed' && <RecipeFeedComponent />}
        {currentView === 'mixedSearch' && <MixedSearchComponent />}
        {currentView === 'blogPost' && <ArticleList />}
        {currentView === 'updateProfile' && <UpdateProfileComponent />}
        {currentView === 'createRecipe' && <CreateRecipe />}
        {currentView === 'MealPlanGenerator' && <MealPlanGenerator />}
        {currentView === 'savedRecipes' && <SavedRecipe />}
        
      </Box>
    </Flex>
  );
};

export default DashboardComponent;
