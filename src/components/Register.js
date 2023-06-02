import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/avater.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";

import styles from "../styles/Username.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
      const registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successful!</b>,
        error: <b>Could not Register</b>,
      });
      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  // Formik doesn't support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto bg-rose-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <div className={styles.glass} style={{ width: "" }}>
          {/* Begining of div that contains everything */}

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-center">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">
              Happy to have you here!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className="img rounded-full w-20 h-20 border-gray-400 shadow-lg cursor-pointer border-2 hover:border-gray-200 "
                  src={file || avater}
                  alt="userImage"
                />
              </label>
              <br />
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center py-4">
              <input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Email*"
                className={styles.textbox}
              />
              <div>&nbsp;</div>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                placeholder="Username*"
                className={styles.textbox}
              />
              <div>&nbsp;</div>
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="Password"
                className={styles.textbox}
              />
              <div>&nbsp;</div>
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-400">
                Already have an account ?
                <Link className="underline text-blue-500 italic" to="/">
                  Login Now
                </Link>
              </span>
            </div>
            <div>&nbsp;</div>
          </form>

          {/* This div contains everything */}
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}
