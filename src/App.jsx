import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Users from "./pages/Users";
import UserGroup from "./pages/UserGroup";
import "./styles/NavBar.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userpage" element={<Users />} />
            <Route path="/usergroup" element={<UserGroup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
