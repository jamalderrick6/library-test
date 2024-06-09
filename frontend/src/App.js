import React, { useEffect } from "react";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";

function App() {
  return (
    <React.Fragment>
      <AppLayout>
        <Home/>
      </AppLayout>
    </React.Fragment>
  );
}

export default App;
