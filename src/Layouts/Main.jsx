import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Container from "../components/Shared/Container";
import NavBar from "../components/Shared/NavBar";

const Main = () => {
  const loc = useLocation();
  useEffect(() => {
    if (loc.pathname === "/") {
      document.title = "MEDLIFE - home";
    } else {
      document.title = `MEDLIFE ${loc.pathname.replace("/", "- ")}`;
    }
    if (loc.state) {
      document.title = loc.state;
    }
  }, [loc]);
  return (
    <div>
      <Container>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default Main;
