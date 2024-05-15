import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ROUTES from "./consts/routes";
import Home from "./pages/home/Home";
import Notifications from "./pages/home/Notifications";
import Users from "./pages/home/Users";
import Forms from "./pages/forms/Forms";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Navigate to={"/login"}></Navigate>}></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.SIGNUP} element={<Signup />}></Route>
        <Route path={ROUTES.HOME.ME} element={<Home />}>
          <Route
            path=""
            element={<Navigate to={ROUTES.HOME.NOTIFICATIONS} />}
          ></Route>
          <Route
            path={ROUTES.HOME.NOTIFICATIONS}
            element={<Notifications />}
          ></Route>
          <Route path={ROUTES.HOME.USERS} element={<Users />}></Route>
        </Route>
        <Route path={ROUTES.FORMS.ME} element={<Forms />} />
      </Routes>
    </>
  );
}

export default App;
