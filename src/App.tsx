import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

import Home from "./pages/Home";
import Home1 from "./pages/Home1";
import Home2 from "./pages/Home2";
import About from "./pages/About";
import About1 from "./pages/About1";
import About2 from "./pages/About2";
import Services from "./pages/Services";
import Services1 from "./pages/Services1";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import Comparison from "./pages/Comparison";
import Comparison1 from "./pages/Comparison1";
import Comparison2 from "./pages/Comparison2";

// ✅ IMPORTANT: matches your actual file name exactly (case-sensitive on Netlify)

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Dashboard";

// ✅ Default import (DashboardAnalytics.tsx has export default)
import DashboardAnalytics from "./pages/DashboardAnalytics";

import DashboardReports from "./pages/DashboardReports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// newly added pages
import Search from "./pages/Search";
import ComparisonTable from "./pages/ComparisonTable";
import Forms from "./pages/Forms";
import DataTable from "./pages/DataTable";
import Infographics from "./pages/Infographics";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Animation from "./pages/Animation";
import DragDrop from "./pages/DragDrop";
import Editor from "./pages/Editor";
import ShoppingCart from "./pages/ShoppingCart";
import Calendar from "./pages/Calendar";
import Security from "./pages/Security";
import Help from "./pages/Help";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-grow-1" style={{ minHeight: "calc(100vh - 120px)" }}>
        {/* Left Sidebar */}
        <div style={{ width: "200px" }}>
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 p-3">
          <Routes>
            {/* home */}
            <Route path="/" element={<Home />} />
            <Route path="/home1" element={<Home1 />} />
            <Route path="/home2" element={<Home2 />} />

            {/* about */}
            <Route path="/about" element={<About />} />
            <Route path="/about1" element={<About1 />} />
            <Route path="/about2" element={<About2 />} />

            {/* services */}
            <Route path="/services" element={<Services />} />
            <Route path="/services1" element={<Services1 />} />

            {/* comparison */}
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/comparison1" element={<Comparison1 />} />
            <Route path="/comparison2" element={<Comparison2 />} />

            {/* dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
            <Route path="/dashboard/reports" element={<DashboardReports />} />

            {/* profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />

            {/* auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          

            {/* others */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/search" element={<Search />} />
            <Route path="/comparisontable" element={<ComparisonTable />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/datatable" element={<DataTable />} />
            <Route path="/infographics" element={<Infographics />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/video" element={<Video />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/dragdrop" element={<DragDrop />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/security" element={<Security />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>

        {/* Right Sidebar */}
        <div style={{ width: "220px" }}>
          <RightSidebar />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
