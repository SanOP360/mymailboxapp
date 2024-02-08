import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import Home from "./components/pages/Home";
import EmailList from "./components/pages/EmailList";
import Navbar from "./components/UI/Navbar";
import Sidebar from "./components/UI/SideBar";
import EmailDetails from "./components/pages/EmailDetail";
function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/inbox" element={<EmailList />} />
          <Route path="/emails/:id" element={<EmailDetails />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
