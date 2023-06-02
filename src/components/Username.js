import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/avater.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

import styles from "../styles/Username.module.css";

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);
  // const username = useAuthStore((state) => state.auth.username);
  // const setUsername = useAuthStore((state) => state.auth.setUsername);

  // useEffect(() => {
  //   console.log(username);
  // });

  const formik = useFormik({
    initialValues: {
      username: "example123",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      setUsername(values.username);
      navigate("/password");
    },
  });
  return (
    <div className="container mx-auto bg-rose-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <div className={styles.glass}>
          {/* Begining of div that contains everything */}

          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Cardy</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">
              Always Available
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className="img rounded-full max-w-xs border-gray-400 shadow-lg cursor-pointer border-2 hover:border-gray-200 "
                src={avater}
                alt="userImage"
              />
            </div>
            <div className="item-center text-sm text-center text-gray-400 mt-6">
              Username here:
            </div>
            <div className="textbox flex flex-col items-center py-4">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />

              <div>&nbsp;</div>
              <button className={styles.btn} type="submit">
                Get Started
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-400">
                Don't have a card ?{" "}
                <Link className="underline text-blue-500 italic" to="/register">
                  Register Now
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
