import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import Loading from "../Loading";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [data] = useUser();

  if (loading) {
    return <Loading></Loading>;
  }

  const handleLogout = async () => {
    await logOut();
  };

  const links = [
    { name: "Home", path: "/" },
    {
      name: "watch demo",
      path: "https://www.youtube.com/watch?v=JKn3qxw83Jc",
    },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
  ];

  return (
    <div className="navbar px-6 font-poppins">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow uppercase"
          >
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="font-medium text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to={"/"} className="flex gap-2 items-center">
          <img className="w-8" src={logo} alt="" />
          <h1 className=" text-2xl font-extrabold">GigZoom.</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-10 px-1 uppercase">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="font-medium text-sm">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {user ? (
        <div className="navbar-end space-x-2">
          {/* ======== Profile ========= */}
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="mt-2">
              <div className="avatar">
                <div className="mask mask-squircle w-12">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content text-center space-y-1 -translate-x-16 w-48 bg-base-100 rounded-box z-50  p-2 shadow"
            >
              <li className="font-bold">{user?.displayName}</li>
              <Link
                to={"/dashboard"}
                className="btn-sm px-5 bg-gray-800 text-white rounded-full btn w-full"
              >
                Dashboard
              </Link>

              <Link
                to={"/login"}
                className="btn-sm px-5 bg-gray-800 text-white rounded-full btn w-full"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </ul>
          </div>

          <Link
            to={"/dashboard/purchase-coin"}
            className="btn text-lg font-extrabold"
          >
            ${data?.coins}
          </Link>
        </div>
      ) : (
        <div className="navbar-end space-x-2">
          <Link
            to={"/login"}
            className="btn-sm px-5 bg-gray-800 text-white rounded-full btn"
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="btn-sm px-5 bg-gray-800 text-white rounded-full btn"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
