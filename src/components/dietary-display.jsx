import React, { useState, useEffect } from 'react';
import {
  Box,
  Tag,
  Wrap,
  WrapItem,
  Button,
  useToast
} from '@chakra-ui/react';

const DietaryRestrictionsDisplay = () => {
  const [restrictions, setRestrictions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const storedRestrictions = localStorage.getItem('dietaryRestrictions');
    if (storedRestrictions) {
      setRestrictions(JSON.parse(storedRestrictions));
    }
  }, []);

  const removeRestriction = (item) => {
    const updatedRestrictions = restrictions.filter(r => r !== item);
    setRestrictions(updatedRestrictions);
    localStorage.setItem('dietaryRestrictions', JSON.stringify(updatedRestrictions));
    toast({
      title: 'Dietary restriction removed.',
      description: `${item} has been removed from your dietary restrictions.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <Wrap>
        {restrictions.map((item, index) => (
          <WrapItem key={index}>
            <Tag size="lg" borderRadius="full" variant="solid" colorScheme="orange" m={1}>
              {item}
              <Button size="xs" ml={2} onClick={() => removeRestriction(item)}>x</Button>
            </Tag>
          </WrapItem>
        ))}
        {restrictions.length === 0 && <p>No dietary restrictions selected.</p>}
      </Wrap>
    </Box>
  );
};

export default DietaryRestrictionsDisplay;
