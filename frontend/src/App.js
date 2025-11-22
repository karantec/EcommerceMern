import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Header />

      {/* Remove the max-width container here */}
      <main className="pt-24 pb-8">
        <Outlet />
      </main>
      <Footer />

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;
