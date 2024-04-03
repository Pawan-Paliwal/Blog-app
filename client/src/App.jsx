import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivate from "./components/OnlyAdminPrivate";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashBoard" element={<DashBoard />}></Route>
        </Route>
        <Route element={<OnlyAdminPrivate />}>
          <Route path="/create-post" element={<CreatePost />}></Route>
        </Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
