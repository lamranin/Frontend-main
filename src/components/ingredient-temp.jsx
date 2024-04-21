import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { IngredientSuggestion } from '../script/helper'; // Import the helper function

const IngredientAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (event) => {
    setInputValue(event.query);
    setLoading(true);

    try {
      const result = await IngredientSuggestion({ query: event.query });
      setOptions(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Optionally, you can call the search function here to perform
    // the search as the user types
    search({ query: event.target.value });
  };

  return (
    <AutoComplete
      field="name"
      value={inputValue}
      suggestions={options}
      completeMethod={search}
      onChange={(e) => setInputValue(e.value)}
      
    />
  );
};

export default IngredientAutocomplete;
