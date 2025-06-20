import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import { ImageUploader } from "./components/misc/ImageUploader";
import CommonLayout from "./components/CommonLayout";
import Home from "./pages/Home/Index";
import { NotesDataProvider } from "./Contexts/NoteDataContext";
import AuthLoader from './contexts/AuthLoader';

const App = () => {
  return (
    <AuthLoader>
      <NotesDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CommonLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/upload" element={<ImageUploader />} />
          </Routes>
        </BrowserRouter>
      </NotesDataProvider>
    </AuthLoader>
  );
};

export default App;
