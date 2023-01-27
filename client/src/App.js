import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinChat from "./components/Join/JoinChat";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<JoinChat />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
