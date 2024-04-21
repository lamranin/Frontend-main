import React, { useState } from 'react';
import { IngredientSuggestion, recipeFromIngredients } from '../script/helper';
import { AutoComplete } from 'primereact/autocomplete';
import { Heading, Box, Button, Container , Flex, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';

const IngredientSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const handleInputChange = async (event) => {
        const query = event.target.value;
        setInputValue(query);
    
        try {
          const result = await IngredientSuggestion( {query:query});
          setSuggestions(result || []); // Ensure suggestions is always an array
        } catch (error) {
          console.error(error);
        }
      };
      const search = async (event) => {
        const query = event.query;
        setInputValue(query);
    
        try {
          const result = await IngredientSuggestion({ query: query });
          setSuggestions(result || []); // Ensure suggestions is always an array
        } catch (error) {
          console.error(error);
        }
      };

      

      const handleSelectedIngredient = async (event) => {
        try {
          const selectedIngredient = event.value?.name ;
          const result = await recipeFromIngredients({ ingredients: selectedIngredient });
          setRecipes(result || []); // Ensure recipes is always an array
        } catch (error) {
          console.error(error);
        }
      };

      const suggestionTemplate = (suggestion) => {
        return (
          <Box style={{backgroundColor:'black.50'}}>
            <img src={'https://img.spoonacular.com/ingredients_100x100/'+ suggestion.image} alt={suggestion.name} style={{ marginRight: '20px', width: '32px', height: '32px',  }} />
            <div>{suggestion.name}</div>
          </Box>
          
        );
      };
  return (
    <Stack  direction='row'>
        <AutoComplete
        className='p-autocomplete'
        size={20}
        value={inputValue}
        suggestions={suggestions}
        completeMethod={search}
        field="name"
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Search for ingredients..."
        itemTemplate={suggestionTemplate}
        onSelect={handleSelectedIngredient}
        
      >
        <ul>
        {suggestions.map((ingredient, index) => (
            <li key={index}>{ingredient?.name}</li>
            ))}
            </ul>
        </AutoComplete>
      
      <Box className="recipe-suggestions">
        <Heading as='h1' size='xl'>Recipe Suggestions</Heading>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>{recipe.title}</li>
          ))}
        </ul>
      </Box>
    
     
        
    
    
    </Stack>
    
  );
};
export default IngredientSearch;

/*
 return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for ingredients..."
        />
        <ul>
          {suggestions.map((ingredient, index) => (
            <li key={index}>{ingredient?.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  */