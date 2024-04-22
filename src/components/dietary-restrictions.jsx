import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Heading,
  useToast,
} from '@chakra-ui/react';

const DietaryRestrictionsPicker = () => {
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Load saved restrictions from local storage on component mount
    const savedRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions') || '[]');
    setSelectedRestrictions(savedRestrictions);
  }, []);

  const handleSaveRestrictions = () => {
    localStorage.setItem('dietaryRestrictions', JSON.stringify(selectedRestrictions));
    toast({
      title: 'Preferences Saved',
      description: 'Your dietary restrictions have been saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Select Your Dietary Restrictions</Heading>
      <CheckboxGroup colorScheme="green" defaultValue={selectedRestrictions} onChange={setSelectedRestrictions}>
        <Stack spacing={[1, 5]} direction={['column', 'column']}>
          <Checkbox value="glutenFree">Gluten Free</Checkbox>
          <Checkbox value="ketogenic">Ketogenic</Checkbox>
          <Checkbox value="vegetarian">Vegetarian</Checkbox>
          <Checkbox value="vegan">Vegan</Checkbox>
          <Checkbox value="pescatarian">Pescatarian</Checkbox>
          <Checkbox value="paleo">Paleo</Checkbox>
          <Checkbox value="primal">Primal</Checkbox>
          <Checkbox value="lowFODMAP">Low FODMAP</Checkbox>
          <Checkbox value="dairyFree">Dairy Free</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Button mt={4} colorScheme="blue" onClick={handleSaveRestrictions}>Save Preferences</Button>
    </Box>
  );
};

export default DietaryRestrictionsPicker;
