import React, {useState, useEffect} from 'react'
import { Text, Flex, Avatar, Box } from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { IngredientSuggestion } from '../script/helper';

const ingredients = [
  { value: "Apple", label: "Apple" },
  { value: "Butter", label: "Butter" },
  { value: "Minced Beef", label: "Minced Beef" },
  { value: "Rice", label: "Rice" },
  { value: "Potato", label: "Potato" },
  { value: "Garlic", label: "Garlic" },
  { value: "Chicken Thighs", label: "Chicken Thighs" }
];


//query: pickerItems ? pickerItems.value : undefined,
export default function SearchIngredientComponent() {
  const [pickerItems, setPickerItems] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  useEffect(() => {
    if (
      pickerItems
    ) {
      const params = {
        query: pickerItems ? pickerItems.value : undefined,
      }
      IngredientSuggestion(params)
        .then((data) => setPickerItems(data))
        .catch((error) => console.error("Failed to fetch recipes:", error));
    }
  }, [pickerItems]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const customRender = (selected) => {
    return (
      <Flex flexDir="row" alignItems="center">
        <Avatar mr={2} size="sm" name={selected.label} />
        <Text>{selected.label}</Text>
      </Flex>
    )
  }

  const customCreateItemRender = (value) => {
    return (
      <Text>
        <Box as='span'>Create</Box>{' '}
        <Box as='span' bg='red.300' fontWeight='bold'>
          "{value}"
        </Box>
      </Text>
    )
  }

 

  return (
          <CUIAutoComplete
            tagStyleProps={{
              rounded: 'full'
            }}
            label="Pick some of the ingredients you have in your fridge or pantry to receive a suggestion from MyFoodHelper:"
            placeholder="Type an Ingredient"
            onCreateItem={handleCreateItem}
            items={pickerItems}
            value={foodItems}
            itemRenderer={customRender}
            createItemRenderer={customCreateItemRender}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
            }
          />
  );
}
