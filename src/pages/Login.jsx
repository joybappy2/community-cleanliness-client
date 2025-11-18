import React, { use } from "react";
import logiImage from "../assets/loginImage.jpg";
import { Link, useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthContext from "../components/AuthContext";
import PageTitle from "../components/PageTitle";

const Login = () => {
  const { googleLogin } = use(AuthContext);
  const { loginUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleEPLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Logged in Successfully",
          icon: "success",
          draggable: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.code}`,
        });
      });
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          title: "Logged in Successfully",
          icon: "success",
          draggable: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.code}`,
        });
      });
  };

  return (
    <div className=" md:grid grid-cols-12">
      <PageTitle title="Login" />

      {/* IMAGE LEFT */}
      <div className="col-span-9">
        <img
          className="w-full md:h-screen object-cover"
          src={logiImage}
          alt=""
        />
      </div>

      {/* LOGIN FORM RIGHT */}
      <div className="col-span-3 flex flex-col justify-center">
        <div className="w-full p-10 bg-white">
          <form onSubmit={handleEPLogin}>
            <fieldset className="fieldset">
              {/* EMAIL */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                required
                placeholder="Email"
                name="email"
              />

              {/* PASSWORD */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                name="password"
                required
              />

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              {/* LOGIN BUTTON */}
              <button className="btn bg-secondary hover:bg-green-500 text-white mt-4 ">
                Login
              </button>
            </fieldset>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white border-secondary mt-1"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-sm mt-1">
            Don't have an account?{" "}
            <span>
              <Link
                to="/register"
                className="text-secondary hover:text-green-500 hover:underline font-semibold"
              >
                Register
              </Link>
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          {/* HOME BUTTON */}
          <Link to="/">
            <button className="btn bg-secondary text-white">
              <FaHome />
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
