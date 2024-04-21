import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Textarea,
  useColorModeValue,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WriteArticlePage = ({ activeUser, recipeId, onSaveArticle }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [articleContent, setArticleContent] = useState('');

    const handleSaveArticle = () => {
        if (!articleContent.trim()) {
            toast({
                title: "Error",
                description: "Please write something before saving.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Save the article content
        onSaveArticle(activeUser.id, recipeId, articleContent);

        // Show success toast
        toast({
            title: "Success",
            description: "Article saved successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Navigate to the article page
        navigate(`/article/${recipeId}`);
    };

    return (
        <Box position="fixed" inset="0" bg="gray.100" overflowY="auto">
            <Container maxW="container.xl" py="12">
                <Heading size="xl" mb={8}>Write Your Article</Heading>
                <VStack spacing={5}>
                    <Textarea
                        placeholder="Write your article here..."
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        size="lg"
                        h="300px"
                    />
                    <Button colorScheme="purple" onClick={handleSaveArticle}>
                        Save Article
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default WriteArticlePage;
