import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/signIn-page";
import SignUpComponent from "./components/signUp-page";
import CreateArticle from "./components/create-recipe";
import DashboardComponent from "./components/dashboardd-component";
import LoginPage from "./components/new-sign-up";
import ArticleList from "./components/blog-component";
import {ChakraProvider} from "@chakra-ui/react"
import BlogComponent from "./components/food-articles";
import ArticleComponent from "./components/front-articles";
function App() {
  return (
    <ChakraProvider>
      <Router>
      <Routes>
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/signup" exact element={<SignUpComponent />} />
        <Route path="/recipe/create" exact element={<CreateArticle />} />
        <Route path="/dashboard" exact element={<DashboardComponent />} />
        <Route path="/login2" exact element={<LoginPage/>}/>
        <Route path="/blog" exact element={<BlogComponent/>}/>
        <Route path="/" exact element={<DashboardComponent />} />
        <Route path="/write-article" exact element={<ArticleComponent />} />
      </Routes>
    </Router>
    </ChakraProvider>
    
  );
}

export default App;
