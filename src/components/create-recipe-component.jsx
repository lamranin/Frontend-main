import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';

const CreateRecipeComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setImages([]);
        setStep(1);
        onClose();
    };

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    // Implement handleSubmit for when the form is completed
    const handleSubmit = () => {
        console.log({ title, content, images });
        resetForm();
    };

    return (
        <>
            <IconButton
                aria-label="Create recipe"
                icon={<AiOutlinePlus />}
                isRound
                size="lg"
                colorScheme="blue"
                onClick={onOpen}
                position="fixed"
                bottom="4"
                right="4"
            />

            <Modal isOpen={isOpen} onClose={resetForm} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a New Recipe</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            {step === 1 && (
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe Title" />
                                </FormControl>
                            )}
                            {step === 2 && (
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Recipe Description" />
                                </FormControl>
                            )}
                            {step === 3 && (
                                <FormControl>
                                    <FormLabel>Images</FormLabel>
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            const filesArray = Array.from(e.target.files).map((file) =>
                                                URL.createObjectURL(file)
                                            );
                                            setImages((prevImages) => [...prevImages, ...filesArray]);
                                        }}
                                    />
                                    <VStack spacing={2} mt={2}>
                                        {images.map((image, index) => (
                                            <img key={index} src={image} alt={`recipe-${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        ))}
                                    </VStack>
                                </FormControl>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        {step > 1 && <Button onClick={prevStep} mr={3}>Back</Button>}
                        {step < 3 && <Button colorScheme="blue" onClick={nextStep}>Next</Button>}
                        {step === 3 && <Button colorScheme="green" onClick={handleSubmit}>Submit</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateRecipeComponent;
