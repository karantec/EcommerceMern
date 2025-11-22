// src/components/Admin/AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCartShopping,
  FaCircleUser,
  FaGauge,
  FaPowerOff,
  FaTable,
  FaUserGroup,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa6";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";

const SidebarItem = ({ to, icon: Icon, children, onClick }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 
                   hover:bg-red-500/10 hover:text-red-400 transition-all duration-200
                   hover:translate-x-1 active:scale-[0.98]"
      >
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg 
                       bg-slate-700/50 text-red-400
                       group-hover:bg-red-500/20 group-hover:scale-110
                       transition-all duration-200">
          <Icon className="w-4 h-4" />
        </span>
        <span>{children}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
         hover:translate-x-1 active:scale-[0.98]
         ${
           isActive
             ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-900/50"
             : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
         }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-white/20 text-white scale-110"
                  : "bg-slate-700/50 text-green-400 group-hover:bg-green-500/20 group-hover:scale-110"
              }`}
          >
            <Icon className="w-4 h-4" />
          </span>
          <span className="flex-1 truncate">{children}</span>
          {isActive && (
            <span className="w-1 h-6 bg-white rounded-full"></span>
          )}
        </>
      )}
    </NavLink>
  );
};

const AdminSidebar = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/admin/login");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Logout failed");
    }
  };

  return (
    <nav className="w-64 h-full flex flex-col bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-r border-slate-700">
      {/* Header Section */}
      <div className="px-5 py-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-900/50 ring-2 ring-green-400/20">
            <FaLayerGroup className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              FARM SHOP
            </h2>
            <p className="text-xs text-green-400 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="mb-3 px-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Navigation
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          <SidebarItem to="/admin/dashboard" icon={FaGauge}>
            Dashboard
          </SidebarItem>

          <SidebarItem to="/admin/category-list" icon={FaLayerGroup}>
            Categories
          </SidebarItem>

          <SidebarItem to="/admin/product-list" icon={FaTable}>
            Products
          </SidebarItem>

          <SidebarItem to="/admin/order-list" icon={FaCartShopping}>
            Orders
          </SidebarItem>

          <SidebarItem to="/admin/user-list" icon={FaUsers}>
            Users
          </SidebarItem>

          <SidebarItem to="/admin/admin-list" icon={FaUserGroup}>
            Admins
          </SidebarItem>
        </div>

        {/* Account Section */}
        <div className="mt-6 mb-3 px-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Account
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          <SidebarItem to="/admin/profile" icon={FaCircleUser}>
            Profile
          </SidebarItem>

          <SidebarItem onClick={logoutHandler} icon={FaPowerOff}>
            Logout
          </SidebarItem>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-900/50 ring-2 ring-green-400/20">
              A
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-slate-400 truncate">
              admin@farmshop.com
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSidebar;