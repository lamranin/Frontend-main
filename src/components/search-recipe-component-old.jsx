import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Card,
  CardBody,
  Text,
  SimpleGrid,
  Image,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
} from "@chakra-ui/react";

import { CreatableSelect } from "chakra-react-select";
import { fetchRecipeById, searchRecipeByParams } from "../script/helper";


export const SearchRecipeComponentExternal = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);



  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedId, setSelectedId] = useState();

  const [selectedFood, setSelectedFood] = useState();

  const [selectedCuisine, setSelectedCuisine] = useState();
  const [selectedDiet, setSelectedDiet] = useState();
  const [selectedIntolerance, setSelectedIntolerance] = useState();
  const [selectedEquipment, setSelectedEquipment] = useState();

  const [selectedTypeCourse, setSelectedTypeCourse] = useState();
  const [recipes, setRecipes] = useState([]);

  const [numberOfResults, setNumberOfResults] = useState(10);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (
      selectedFood ||
      selectedCuisine ||
      selectedDiet ||
      selectedIntolerance ||
      selectedEquipment ||
      selectedTypeCourse
    ) {
      const params = {
        query: selectedFood ? selectedFood.value : undefined,
        cuisine: selectedCuisine ? selectedCuisine.value : undefined,
        diet: selectedDiet ? selectedDiet.value : undefined,
        intolerances: selectedIntolerance
          ? selectedIntolerance.value
          : undefined,
        equipment: selectedEquipment ? selectedEquipment.value : undefined,
        type: selectedTypeCourse ? selectedTypeCourse.value : undefined,

        number: 10,
        offset: offset,
      }
      searchRecipeByParams(params)
        .then((data) => setRecipes(data))
        .catch((error) => console.error("Failed to fetch recipes:", error));
    }
  }, [
    selectedFood,
    selectedCuisine,
    selectedDiet,
    selectedIntolerance,
    selectedEquipment,
    selectedTypeCourse,
    offset,
    pageCount
  ]);

  useEffect(() => {
    if (selectedId) {
      fetchRecipeById(selectedId)
        .then((data) => setRecipeDetails(data))
        .catch((error) => console.error("Failed to fetch recipe details:", error));
    }
  }, [selectedId]);

  const incrementOffset = () => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + numberOfResults;
      setPageCount((prevPageCount) => prevPageCount + 1);
      return newOffset;
    });
  };

  const decrementOffset = () => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset - numberOfResults;
      setPageCount((prevPageCount) => prevPageCount - 1);
      return newOffset;
    });
  };

  return (
    <Stack bgGradient='linear(#D3CCE3 10%, #E9E4F0 25%)'>
      <Heading textAlign="center" as="h1" size="2xl" margin={"5"}>
        {" "}
        Search Recipe
      </Heading>
      <Stack bgGradient='linear(#D3CCE3 900%, #E9E4F0 25%)'
        margin="10"
        padding={"10"}
        boxShadow="lg"
        p="6"
        rounded="md"
      >
        <Stack direction="row" gap={"10"} padding={"4"} >
          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Food Item</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "Burger", value: "burger" },
                { label: "Pizza", value: "pizza" },
                { label: "Pasta", value: "pasta" },
                { label: "Salad", value: "salad" },
                { label: "Soup", value: "soup" },
              ]}
              placeholder="Pizza,Pasta,...."
              value={selectedFood}
              onChange={(event) => {
                if (event) {
                  setSelectedFood({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Cuisine Type</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "American", value: "american" },
                { label: "Italian", value: "italian" },
                { label: "Mexican", value: "mexican" },
                { label: "Indian", value: "indian" },
                { label: "Chinese", value: "chinese" },
                { label: "Japanese", value: "japanese" },
                { label: "Korean", value: "korean" },
                { label: "Thai", value: "thai" },
                { label: "Vietnamese", value: "vietnamese" },
                { label: "British", value: "british" },
                { label: "Irish", value: "irish" },
                { label: "French", value: "french" },
                { label: "Moroccan", value: "moroccan" },
                { label: "Greek", value: "greek" },
                { label: "Spanish", value: "spanish" },
                { label: "Middle Eastern", value: "middle eastern" },
                { label: "Jewish", value: "jewish" },
              ]}
              placeholder="American,Italian,...."
              value={selectedCuisine}
              onChange={(event) => {
                if (event) {
                  setSelectedCuisine({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Diet</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "Gluten Free", value: "gluten free" },
                { label: "Ketogenic", value: "ketogenic" },
                { label: "Non Vegetarian", value: "non vegetarian" },
                { label: "Vegetarian", value: "vegetarian" },
                { label: "Lacto-Vegetarian", value: "lacto vegetarian" },
                { label: "Ovo-Vegetarian", value: "ovo vegetarian" },
                { label: "Pescetarian", value: "pescetarian" },
                { label: "Paleo", value: "paleo" },
                { label: "Primal", value: "primal" },
              ]}
              placeholder="Pizza,Pasta,...."
              value={selectedDiet}
              onChange={(event) => {
                if (event) {
                  setSelectedDiet({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>
        </Stack>

        <Stack direction={"row"} gap={"10"} padding={"4"}>
          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Intolerances</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "Dairy", value: "dairy" },
                { label: "Egg", value: "egg" },
                { label: "Gluten", value: "gluten" },
                { label: "Grain", value: "grain" },
                { label: "Peanut", value: "peanut" },
                { label: "Seafood", value: "seafood" },
                { label: "Sesame", value: "sesame" },
                { label: "Shellfish", value: "shellfish" },
                { label: "Soy", value: "soy" },
                { label: "Sulfite", value: "sulfite" },
                { label: "Tree Nut", value: "tree nut" },
                { label: "Wheat", value: "wheat" },
              ]}
              placeholder="Pizza,Pasta,...."
              value={selectedIntolerance}
              onChange={(event) => {
                if (event) {
                  setSelectedIntolerance({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Equipment</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "Blender", value: "blender" },
                { label: "Pan", value: "pan" },
                { label: "Frying Pan", value: "frying pan" },
                { label: "Grill", value: "grill" },
                { label: "Oven", value: "oven" },
                { label: "Stove", value: "stove" },
                { label: "Toaster", value: "toaster" },
              ]}
              placeholder="Pan,Grill,...."
              value={selectedEquipment}
              onChange={(event) => {
                if (event) {
                  setSelectedEquipment({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"bold"}> Select Type of Course</FormLabel>
            <CreatableSelect
              options={[
                { label: "None", value: "" },
                { label: "Main Course", value: "main course" },
                { label: "Side Dish", value: "side dish" },
              ]}
              placeholder="Main Course,...."
              value={selectedTypeCourse}
              onChange={(event) => {
                if (event) {
                  setSelectedTypeCourse({
                    label: event.label,
                    value: event.value,
                  });
                }
              }}
            />
          </FormControl>
        </Stack>
      </Stack>
      {recipes && (
        <ButtonGroup justifyContent={"space-around"}>
          <Button
            colorScheme="red"
            onClick={decrementOffset}
            isDisabled={pageCount === 1}
          >
            Previous Page
          </Button>
          <Text>
            Showing Page{" "}
            <Text as="span" fontWeight={"bold"}>
              {pageCount}
            </Text>{" "}
            out of{" "}
            <Text as="span" fontWeight={"bold"}>
              {Math.ceil(
                recipes.totalResults /
                recipes.number
              ) || 1}
            </Text>
          </Text>

          <Button
            colorScheme="blue"
            onClick={incrementOffset}
            isDisabled={
              pageCount ===
              Math.ceil(
                recipes.totalResults /
                recipes.number
              )
            }
          >
            Next Page
          </Button>
        </ButtonGroup>
      )}
      <Stack margin="10" padding={"4"}>
        <SimpleGrid columns={{ base: 1, lg: 3, xl: 4 }} spacing={10}>
          {(recipes && recipes.results) &&
            recipes.results.map((recipe) => {
              return (
                <Card boxShadow={"xl"}>
                  <CardBody>
                    <Stack justifyContent={"space-between"}>
                      <Stack>
                        <Text
                          fontSize={"xl"}
                          textAlign={"center"}
                          paddingTop={"1"}
                          fontFamily={"helvetica"}
                        >
                          {recipe.title}
                        </Text>
                        <Center>
                          <Image
                            objectFit="cover"
                            src={recipe.image}
                            alt="Image"
                            paddingTop={"2"}
                          />
                        </Center>
                      </Stack>

                      <Center>
                        <Button
                          mt="4"
                          colorScheme="blue"
                          onClick={() => {
                            setSelectedId(recipe.id);
                            onOpen();
                          }}
                        >
                          View Recipe
                        </Button>
                      </Center>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
        </SimpleGrid>
      </Stack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="3xl"
        closeOnOverlayClick={false}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recipe Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              recipeDetails && (
                <Stack p={5}>
                  <Heading as="h1" size="md" textAlign="center">
                    Item Name : {recipeDetails.title}
                  </Heading>
                  <Center>
                    <Image
                      width={"300px"}
                      height={"200px"}
                      src={recipeDetails?.image}
                      alt="Image"
                      paddingTop={"2"}
                    />
                  </Center>
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Food Values</Th>
                          <Th isNumeric>Yes/No</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Vegetarian</Td>
                          <Td isNumeric>
                            {recipeDetails?.vegetarian === true
                              ? "Yes"
                              : "No"}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Gluten Free</Td>
                          <Td isNumeric>
                            {recipeDetails?.glutenFree === true
                              ? "Yes"
                              : "No"}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Dairy Free</Td>
                          <Td isNumeric>
                            {recipeDetails?.dairyFree === true
                              ? "Yes"
                              : "No"}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Cheap</Td>
                          <Td isNumeric>
                            {recipeDetails?.cheap === true ? "Yes" : "No"}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Healthy</Td>
                          <Td isNumeric>
                            {recipeDetails?.veryHealthy === true
                              ? "Yes"
                              : "No"}
                          </Td>
                        </Tr>

                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Heading as="h1" size="md" textAlign="center" m={5}>
                    Summary
                  </Heading>
                  {/* <Text>{getRecipeByIdResult.data?.summary}</Text> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: recipeDetails
                        ? recipeDetails.summary
                        : "Loading...",
                    }}
                  />

                  {
                    recipeDetails.extendedIngredients && (

                      <>
                        <Heading as="h1" size="md" textAlign="center" m={5}>
                          Ingredients
                        </Heading>
                        <ol>
                          {
                            recipeDetails.extendedIngredients.map((ingredient) => (
                              <li key={ingredient.id}>
                                {ingredient.original} - {ingredient.amount}{" "}{ingredient.unit} ({ingredient.measures?.metric?.amount}{" "}{ingredient.measures?.metric?.unitShort})
                              </li>
                            ))
                          }
                        </ol>
                      </>
                    )
                  }

                  <Heading as="h1" size="md" textAlign="center" m={5}>
                    Instructions
                  </Heading>
                  <ol>
                    {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </Stack>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
