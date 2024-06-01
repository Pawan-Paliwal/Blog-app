import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
  HiAnnotation,
} from "react-icons/hi";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, settab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabfromUrl = urlParams.get("tab");
    if(TabfromUrl) {
      settab(TabfromUrl);
    }
  }, [location.search]);
  const handleSignout = async (req, res) => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = res.json();
      if(!data.ok) {
        console.log(error.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch(error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? " Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiAnnotation}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
