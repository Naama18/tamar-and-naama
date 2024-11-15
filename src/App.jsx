
import "./App.css";
import LogIn from "./LogIn";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";
import Info from "./Info";
import Resgister from "./Register";
import ContinueRegister from "./ContinueRegister";
import Todos from "./Todos";
import Albums from "./Albums";
import Index from "./Index";
import NoPage from "./NoPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="LogIn" element={<LogIn />} />

        <Route path="Home" element={<Home />}>
          <Route path="Todos" element={<Todos />} />

          <Route path="Info" element={<Info />} />
          <Route path="Posts" element={<Posts />} />
          <Route path="Albums" element={<Albums />}></Route>
        </Route>
        <Route path="Register" element={<Resgister />} />
        <Route path="ContinueRegister" element={<ContinueRegister />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
