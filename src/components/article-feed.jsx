import React, { useState, useEffect } from 'react';

import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  VStack
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const ArticleDisplay = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/article/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles); // Adjust depending on how your API returns the data
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <VStack spacing={5} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">All Articles</Heading>
      </Box>
      {isLoading ? (
        <Text>Loading articles...</Text>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <List spacing={3}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ListItem key={index} p={2} shadow="sm" borderWidth="1px" borderRadius="md">
                <ListIcon as={MdCheckCircle} color="green.500" />
                <Text fontSize="lg" fontWeight="bold">{article.title}</Text>
                <Text mt={2}>{article.content}</Text>
              </ListItem>
            ))
          ) : (
            <Text>No articles found.</Text>
          )}
        </List>
      )}
    </VStack>
  );
};

export default ArticleDisplay;
