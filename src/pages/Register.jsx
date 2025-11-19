import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../components/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, googleLogin } = use(AuthContext);

  // EP REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    if (passwordError) {
      return;
    }
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password).then((res) => {
      const user = res.user;
      updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      })
        .then(() => {
          console.log(user)
          Swal.fire({
            title: "User Created Successfully",
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

  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;

  const passwordOnChange = (e) => {
    setPasswordError("");
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (currentPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!uppercase.test(currentPassword)) {
      setPasswordError("Password must have an uppercase letter");
      return;
    }
    if (!lowercase.test(currentPassword)) {
      setPasswordError("Password musthave a lowercase letter");
      return;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      {/* LOGIN FORM RIGHT */}
      <div className=" rounded-xl bg-base-300 ">
        <div className="md:w-lg w-full p-10 ">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-5">Register Now!</h2>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              {/* NAME */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Name"
                name="name"
                required
              />

              {/* PHOTO URL*/}
              <label className="label">Photo</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Photo URL"
                name="photo"
                required
              />
              {/* EMAIL */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                name="email"
                required
              />

              {/* PASSWORD */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={passwordOnChange}
              />
              <p className="text-red-500">{passwordError} </p>

              {/* LOGIN BUTTON */}
              <button className="btn bg-secondary text-white hover:bg-green-500 mt-4 ">
                Register
              </button>
            </fieldset>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn w-full  border-secondary mt-1"
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
            Already have an account?{" "}
            <span>
              <Link
                to="/login"
                className="text-secondary hover:text-green-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </span>
          </p>
        </div>

       
      </div>
    </div>
  );
};

export default Register;
