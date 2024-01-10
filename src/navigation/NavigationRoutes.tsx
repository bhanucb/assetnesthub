import { Outlet, Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "../pages/home/Home";
import Popout from "../pages/popout/Popout";
import NotFound from "../pages/starter/NotFound";

export type IpaRoute = {
  path: string;
  name: string;
};

export const NAVBAR_LINKS: Array<IpaRoute> = [
  { path: "/", name: "Home" },
  { path: "/test", name: "Test" },
];

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
      <Route path="/test/:tabId" element={<div>TEST</div>} />
      <Route path="/popout/:tabId" element={<Popout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NavigationRoutes;
