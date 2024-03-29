import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Popout from "../pages/popout/Popout";
import NotFound from "../pages/starter/NotFound";
import NavigationBar from "./NavigationBar";

function PageWithNavigationBar() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

function NavigationRoutes() {
  return (
    <Routes>
      <Route element={<PageWithNavigationBar />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/layout/:tabId" element={<Popout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NavigationRoutes;
