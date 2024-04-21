import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, useToast } from '@chakra-ui/react';
import { addCommentToRecipe } from '../script/helper';

const CommentModal = ({ isOpen, onClose, recipeId, commentCount, setCommentCount }) => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    const handleSubmitComment = async () => {
        setIsSubmitting(true);
        try {
            const response = await addCommentToRecipe(recipeId, comment);
            if (response) {
                setCommentCount(commentCount + 1);
                toast({
                    title: 'Success',
                    description: 'Comment added successfully',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            onClose(); // Close the modal after submitting
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add comment',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
            setComment(''); // Reset comment field
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmitComment} isLoading={isSubmitting}>
                        Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CommentModal;
