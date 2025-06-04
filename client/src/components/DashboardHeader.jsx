import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useMutation, useApolloClient } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/mutations";
import { userLogout } from "../redux/Slice/userSlice";
import { toast } from "react-hot-toast";

export default function DashboardHeader() {
  const { user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useApolloClient();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { id: 1, name: "Hero", to: "/admin/dashboard" },
    { id: 2, name: "About", to: "/admin/about" },
    { id: 3, name: "Skill", to: "/admin/skill" },
    { id: 4, name: "Project", to: "/admin/project" },
    { id: 5, name: "Contact", to: "/admin/contact" },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data?.logout?.message) {
        console.log("Logout response:", data.logout.message);
        dispatch(userLogout());
        await client.clearStore();
        navigate("/admin/login");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className=" px-4 bg-gray-100 sm:px-6 lg:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* Logo/Name */}
      <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
        {user?.username || "Dashboard"}
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className="px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 font-medium"
          >
            {link.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full bg-gray-100 left-0 right-0 shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-white hover:bg-gray-900 rounded-md transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`px-4 py-2 rounded-md font-medium text-left transition-colors duration-200 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}