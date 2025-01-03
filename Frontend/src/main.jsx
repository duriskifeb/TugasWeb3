import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Pastikan ini dari 'react-router-dom'
import Login from "./Pages/login.jsx";
import Register from "./Pages/register.jsx";
import Pll from "./Pages/main.jsx"; // Pastikan ini adalah komponen utama Anda
import { ConfigProvider, theme } from "antd";
import Profile from "./Pages/Profile.jsx";
import Formu from "./Pages/TypesForm.jsx";
import History from "./Pages/HistoryPage.jsx";
import Page404 from "./Pages/Page404.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Index from "./Pages/Admin/Index.jsx";

createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#373660" } }}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Pll />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<Formu />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="/admin/dashboard" element={<Index />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
