import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotesDataProvider } from "./contexts/NoteDataContext";
import AuthLoader from './contexts/AuthLoader';
import Spinner from "./components/Common/Spinner";
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const ImageUploader = lazy(() => import("./components/misc/ImageUploader"));
const CommonLayout = lazy(() => import("./components/CommonLayout"));
const Home = lazy(() => import("./pages/Home/Index"));

const App = () => {
  return (
    <AuthLoader>
      <NotesDataProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<CommonLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/upload" element={<ImageUploader />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NotesDataProvider>
    </AuthLoader>
  );
};

export default App;
