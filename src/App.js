import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import Home from "./components/pages/Home";
import EmailList from "./components/pages/EmailList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/inbox" element={<EmailList/>}/>
    </Routes>
  );
}

export default App;
