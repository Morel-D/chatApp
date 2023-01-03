import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavigationBar from "./Components/NavigaionBar";
import { useAuthContext } from "./hooks/useAuthContext";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Chat" element={user ? <Chat /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={!user ? <Login /> : <Navigate to="/Chat" />} />
        <Route path="/SignUp" element ={!user ? <SignUp /> : <Navigate to="/Chat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
