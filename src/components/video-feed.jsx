import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
  Text,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';

const FoodVideoSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const toast = useToast();

  const fetchVideos = async () => {
    const query = new URLSearchParams(searchQuery).toString();
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/videos/search?query=${encodeURIComponent(searchQuery)}&number=10`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
           
        }});
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Failed to fetch videos",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Search for food videos</FormLabel>
          <Input
            placeholder="Enter search terms (e.g., pasta)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={fetchVideos}>Search</Button>
        {videos.length > 0 && (
          <Stack spacing={10}>
            {videos.map(video => (
              <HStack key={video.youTubeId} spacing={4}>
                <Image src={video.thumbnail} alt={video.title} boxSize="100px" borderRadius={15}/>
                <VStack align="start">
                  <Text fontWeight="bold">{video.title}</Text>
                  <Text fontSize="sm">Views: {video.views}</Text>
                  <Button as="a" href={`https://www.youtube.com/watch?v=${video.youTubeId}`} target="_blank" colorScheme="red">
                    Watch on YouTube
                  </Button>
                </VStack>
              </HStack>
            ))}
          </Stack>
        )}
      </VStack>
    </Box>
  );
};

export default FoodVideoSearch;
