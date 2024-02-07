import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import Home from "./components/pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
