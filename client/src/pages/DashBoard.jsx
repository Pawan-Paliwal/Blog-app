import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

const DashBoard = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabfromUrl = urlParams.get("tab");
    if(TabfromUrl) {
      settab(TabfromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      {/* SideBar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
};

export default DashBoard;
