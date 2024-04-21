import React, { useState } from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Stack, Text, Spinner } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../script/auth.js";

const SignUpComponent = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    const onClickSignUp = async () => {
        setLoading(true);

        const userData = {
            email: email,
            username: username,
            name: name,
            contact: contactNumber,
            password: password,
            dateOfBirth: dateOfBirth,
            address: address ?? "",
            bio: bio ?? null
        };

        try {
            const user = await signUp(userData);
            // Clear form fields after successful sign up
            setEmail("");
            setUsername("");
            setName("");
            setContactNumber("");
            setPassword("");
            setConfirmPassword("");
            setDateOfBirth("");
            setAddress("");
            setBio("");
            // Navigate to the login page
            if (user) {
                navigate("/login");
            } else {
                console.log("User not signed up");
            }
        } catch (error) {
            console.error("Sign Up Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return email && username && name && contactNumber && password && confirmPassword === password && dateOfBirth;
    };

    return (
        <Flex alignItems="center" justifyContent="center">
            <Box p={8} maxWidth="75%" minWidth="50%" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center" alignItems={"center"} justifyContent={"center"}>
                    <Heading>Create an Account</Heading>

                </Box>
                <Box my={4} textAlign="left">
                    <form>
                        <Stack spacing={4}>

                            <FormControl>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Contact Number</FormLabel>
                                <Input type="tel" placeholder="Enter your contact number" value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Retype Password</FormLabel>
                                <Input type="password" placeholder="Enter your password again" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Date of Birth</FormLabel>
                                <Input type="date" value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value.toString()) }} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input type="text" placeholder="Enter your address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Bio</FormLabel>
                                <Input type="text" placeholder="Write a short bio about yourself" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                            </FormControl>

                            <Button colorScheme="blue" mt={4} onClick={onClickSignUp} isLoading={loading} isDisabled={!isFormValid()} type="submit">
                                {loading ? (
                                    <Spinner size="sm" color="white" />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Text mt={4} textAlign="center">
                    Already have an account? <Text as="span" color="teal.500" fontWeight="bold"><Link to="/login">Sign In</Link></Text>
                </Text>
            </Box>
        </Flex >
    );
};

export default SignUpComponent;
