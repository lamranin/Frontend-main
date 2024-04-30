import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUpComponent from "./components/signUp-page";
import CreateArticle from "./components/create-recipe";
import DashboardComponent from "./components/dashboard-component";
import LoginPage from "./components/sign-in";
import ArticleList from "./components/blog-component";
import {ChakraProvider} from "@chakra-ui/react"
import BlogComponent from "./components/food-articles";
import ArticleComponent from "./components/front-articles";
import ArticleDisplay from "./components/article-feed";
function App() {
  return (
    <ChakraProvider>
      <Router>
      <Routes>

        <Route path="/signup" exact element={<SignUpComponent />} />
        <Route path="/recipe/create" exact element={<CreateArticle />} />
        <Route path="/dashboard" exact element={<DashboardComponent />} />
        <Route path="/login" exact element={<LoginPage/>}/>
        <Route path="/blog" exact element={<BlogComponent/>}/>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/write-article" exact element={<ArticleComponent />} />
        <Route path="/articles" exact element={ <ArticleDisplay/>}/>
      </Routes>
    </Router>
    </ChakraProvider>
    
  );
}

export default App;
