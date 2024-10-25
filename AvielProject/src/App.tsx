import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/MyCards/MyCards";
import CreateCards from "./Pages/CreateCards/CreateCards";
import EditCards from "./Pages/EditCards/EditCards";
import Error from "./Pages/Error/Error";
import CardDetails from "./Pages/CardDetails/CardDetails";
import EditUser from "./Pages/EditUser/EditUser";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-cards" element={<MyCards />} />
        <Route path="/createcards" element={<CreateCards />} />
        <Route path="/cardedit/:id" element={<EditCards />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
