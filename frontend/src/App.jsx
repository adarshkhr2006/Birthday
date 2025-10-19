import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Message from "./pages/Message.jsx";
import Navbar from "./components/Navbar.jsx";
import Balloons from "./components/Balloons.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b12] via-[#0a0820] to-[#0b0b12] text-white">
      <Balloons />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </div>
  );
}
