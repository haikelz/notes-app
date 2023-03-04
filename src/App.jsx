import { atom, useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/organisms/Loading";
import Layout from "./components/templates/Layout";
import AddNote from "./pages/AddNote";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SendEmailConfirmation from "./pages/SendEmailConfirmation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateNote from "./pages/UpdateNote";

const isLoadingAtom = atom(false);
const App = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  return (
    <>
      {!isLoading ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/update-note/:id" element={<UpdateNote />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/send-email-confirmation" element={<SendEmailConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default App;
