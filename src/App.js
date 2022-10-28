import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainForm from './pages/MainForm';
import Auth from './pages/Auth';
import MyCards from './pages/MyCards'
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/admin/auth" element={<Auth isAdmin = {true}/>} />
          <Route path="/admin/*" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
