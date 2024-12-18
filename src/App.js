import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MessageTemplatesPage from "./pages/MessageListingPage";
 import CreateTemplatePage from "./pages/CreateTemplate";

const App = () => (  
  <Router>
    <Routes>
      <Route path="/" element={<MessageTemplatesPage />} />
      <Route path="/create-template" element={<CreateTemplatePage />} />
    </Routes> 
  </Router>
);

export default App;
