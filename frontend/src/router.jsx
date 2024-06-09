import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";

const pages = [
  {
    path: '/',
    component: Home,
  },
];

const CoreRoutes = () => {
  return (
        <Routes>
          <Route element={<AppLayout/>}>
            {pages.map((routes, index) => {
              const { path, component: Component } = routes;
              return <Route key={index} path={path} element={<Component />} />;
            })}
          </Route>
        </Routes>
  );
};

export default CoreRoutes;
