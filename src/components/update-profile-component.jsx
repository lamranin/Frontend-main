import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Flex,
    Heading,
    useToast,
    Image,
    IconButton,
    Center,
    Stack,
} from '@chakra-ui/react';
import { AiOutlineCamera, AiOutlineUpload } from 'react-icons/ai';
import { uploadImage, fetchUserProfile, updateProfile } from "../script/helper.js";

const UpdateProfileComponent = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        contactNumber: '',
        bio: '',
        profilePicture: '',
        address: '',
        dateOfBirth: new Date().toISOString().split('T')[0],
    });
    const toast = useToast();

    useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchUserProfile();
            if (data) {
                setProfile({
                    ...profile,
                    name: data.profileData.person.name,
                    email: data.profileData.email,
                    contactNumber: data.profileData.person.contactNumber,
                    bio: data.profileData.person.bio,
                    profilePicture: data.profileData.person.profilePicture || '',
                    address: data.profileData.person.address,
                    dateOfBirth: data.profileData.person.dateOfBirth ? data.profileData.person.dateOfBirth.split('T')[0] : new Date().toISOString().split('T')[0],
                });
            }
        };
        loadProfile();
    }, []);

    const fileInputRef = useRef(null);

    const handleImageUploadClick = () => {
        fileInputRef.current.click(); // Programmatically click the hidden file input
    };

    const handleImageUpload = async () => {
        const imageUrl = await uploadImage();
        if (imageUrl) {
            setProfile({ ...profile, profilePicture: imageUrl });
            toast({
                title: 'Image uploaded successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => { }, [profile.profilePicture]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImage(file); // Adjust as necessary to pass the file if needed
            if (imageUrl) {
                setProfile({ ...profile, profilePicture: imageUrl });
                toast({
                    title: 'Image uploaded successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = await updateProfile({
                name: profile.name,
                contactNumber: profile.contactNumber,
                bio: profile.bio,
                address: profile.address,
                dateOfBirth: profile.dateOfBirth,
                profilePicture: profile.profilePicture, // Ensure this URL is set by `handleImageUpload`
            });

            // Assuming `updateUserProfile` resolves successfully with the updated profile data
            if (updatedData)
                toast({
                    title: 'Profile Updated',
                    description: 'Your profile information has been successfully updated.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: error.message || 'Failed to update profile information.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" p={5} align="center">
            <Heading mb={6}>Update Profile</Heading>
            {profile.profilePicture && (
                <Box boxSize="150px" mb={4}>
                    <Image src={profile.profilePicture} borderRadius="full" boxSize="150px" objectFit="cover" />
                </Box>
            )}
            <Box width="100%" maxWidth="800px">
                <form onSubmit={handleSubmit}>

                    <Stack direction={"column"} justifyContent={"space-evenly"}>
                        <Stack alignContent={"center"}>
                            <Box position="relative" textAlign="center">
                                <IconButton
                                    icon={<AiOutlineCamera />}
                                    onClick={handleImageUploadClick}
                                    size="lg"
                                    colorScheme="teal"
                                    position="absolute"
                                    bottom={0}
                                    right={0}
                                />
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </Box>
                        </Stack>
                        <Stack
                            alignContent={"center"}
                        >
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Your Name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="contact" isRequired>
                                <FormLabel>Contact Number</FormLabel>
                                <Input
                                    placeholder="Your Contact Number"
                                    value={profile.contactNumber}
                                    onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="bio" isRequired>
                                <FormLabel>Bio</FormLabel>
                                <Input
                                    placeholder="Add your Bio Here"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="Address" isRequired>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    placeholder="Your Address"
                                    value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                />
                            </FormControl>


                            <FormControl id="dateOfBirth" isRequired>
                                <FormLabel>Birth Date</FormLabel>
                                <Input
                                    type='date'
                                    placeholder="Your Address"
                                    value={profile.dateOfBirth}
                                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                                />
                            </FormControl>
                            <Button mt={4} colorScheme="teal" type="submit" justifyContent={"center"}>Update Profile</Button>
                        </Stack>
                    </Stack>


                </form>
            </Box>
        </Flex >
    );
};

export default UpdateProfileComponent;