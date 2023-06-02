import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";

import styles from "../styles/Username.module.css";

export default function Reset() {
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");
  // useEffect(() => {
  //   console.log(apiData);
  // });

  const { username } = useAuthStore((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values);
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-2xl font-bold">{serverError.message}</h1>;
  if (status && status !== 201) return <Navigate to={"/password"}></Navigate>;

  return (
    <div className="container mx-auto bg-rose-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <div className={styles.glass} style={{ width: "50%" }}>
          {/* Begining of div that contains everything */}

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-center">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">
              Enter new password
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4"></div>
            <div className="textbox flex flex-col items-center py-4">
              <input
                {...formik.getFieldProps("password")}
                type="password"
                placeholder="New Password"
                className={styles.textbox}
              />
              <div>&nbsp;</div>
              <input
                {...formik.getFieldProps("confirm_password")}
                type="password"
                placeholder="Confrim Password"
                className={styles.textbox}
              />
              <div>&nbsp;</div>
              <button className={styles.btn} type="submit">
                Sign Up
              </button>
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
