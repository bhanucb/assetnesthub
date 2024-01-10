import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/starter/NotFound";
import NavigationBar from "./NavigationBar";

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
      {/* <Route path="/popout/:tabId" element={<Popout />} /> */}
      <Route path="/popout/:tabId" element={<div>TEST</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default NavigationRoutes;
