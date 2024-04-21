// src/pages/SignIn.js
import React, { useState } from "react";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../script/auth.js";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPass, setFlag] = useState(false);
    //const [show]
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({defaultIsOpen: true})
    const navigate = useNavigate();
    const resetState = () => {
        setEmail("");
        setPassword("");
        setFlag(false);
    }

    const onClickSignIn = async () => {
        const user = {
            email: email,
            password: password
        }
        const response = await signIn(user);
        if (response) {
            resetState();
            navigate("/dashboard");
        }
        else{
            setFlag(true);
        }

    };

    return (
        <Flex align="center" justify="center" h="100vh" >
            <Box p={8} maxWidth="75%" minWidth="35%" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading>Login</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        </FormControl>

                        <Button colorScheme="teal" mt={4} onClick={onClickSignIn}>
                            Sign In
                        </Button>
                    </form>
                </Box>
                {wrongPass
                ?   <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Wrong Login Information!</AlertTitle>
                    <AlertDescription>Incorrect email address or password </AlertDescription>
                </Alert>
                :    <Alert ></Alert>  
                }
                <Text mt={4} textAlign="center">
                    Don't have an account? <Text as="span" color="teal.500" fontWeight="bold"><Link to="/signup">Sign Up</Link></Text>
                </Text>
            </Box>
        </Flex>
    );
};

export default SignIn;
