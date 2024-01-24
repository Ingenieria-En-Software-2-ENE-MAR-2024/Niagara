"use client";

import "tailwindcss/tailwind.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dummy1 from "./pages/Dummy1";

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dummy1" element={<Dummy1 />} />
      </Routes>
    </BrowserRouter>

    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <LoginPage />
    // </main>
  );
}
