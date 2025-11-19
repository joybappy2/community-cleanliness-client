import { Link, NavLink } from "react-router";
import AuthContext from "./AuthContext";
import { use } from "react";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser, loadingUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Logged Out Successfully",
          icon: "success",
          draggable: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.code}`,
        });
      });
  };

  const links = (
    <>
      <li className=" font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className=" font-semibold">
        <NavLink to="all-issue">All Issue</NavLink>
      </li>
      <li className=" font-semibold">
        <NavLink to="add-issue">Add Issue</NavLink>
      </li>
      <li className=" font-semibold">
        <NavLink to="my-issue">My Issue</NavLink>
      </li>
      <li className="font-semibold ">
        <NavLink to="my-contribution">My Contribution</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar md:px-5 pr-0 py-3 bg-secondary text-white shadow">
        <div className="navbar-start flex items-center gap-1">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-2"
            >
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
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link to="/">
            <button className="btn btn-ghost md:text-4xl text-3xl normal-case p-0 md:pl-2">
              FixMyCity
            </button>
          </Link>
        </div>

        <div className="navbar-end space-x-5">
          <div className="flex gap-4 items-center">
            {/* Theme Toggole */}
            <input
              type="checkbox"
              value="light"
              className="toggle btn btn-outline text-white theme-controller "
            />

            <ul className="lg:flex gap-4 items-center hidden">{links}</ul>
          </div>

          <div>
            {loadingUser ? (
              <span className="loading loading-dots loading-md text-white mx-5"></span>
            ) : (
              <div>
                {user ? (
                  <div>
                    {/* NAVBAR  PROFILE */}
                    <div
                      title={user?.displayName}
                      className={`dropdown dropdown-end border-2 border-white rounded-full mr-4 ${
                        !user && "hidden"
                      }`}
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img alt="User Avatar" src={user?.photoURL} />
                        </div>
                      </div>
                      <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-secondary text-white font-semibold rounded-box z-1 mt-3 w-52 p-2 shadow"
                      >
                        <li>
                          <button onClick={handleSignOut}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* LOGIN REGISTER LOGOUT BUTTON */}
                    <div className="flex gap-2 md:gap-4 mr-4">
                      <NavLink to="/login">
                        <button className="btn border-none">Login</button>
                      </NavLink>
                      <NavLink to="/register">
                        <button className="btn border-none">Register</button>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
