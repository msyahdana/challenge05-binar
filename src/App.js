import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailMovie from "./pages/users/DetailMovie";
import Dashboard from "./pages/users/Dashboard";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import NoToken from "./components/Auth/NoToken";
import Protected from "./components/Auth/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <NoToken>
              <Login />
            </NoToken>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="users/detail/:id"
          element={
            <Protected>
              <DetailMovie />
            </Protected>
          }
        />
        <Route
          path="/users/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
