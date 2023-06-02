import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/avater.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/fetch.hook";
// import { useAuthStore } from "../store/store";
import { updateUser } from "../helper/helper";

import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";

export default function Profile() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  // const { username } = useAuthStore((state) => state.auth);
  // const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const [{ isLoading, apiData, serverError }] = useFetch();
  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      console.log(values);
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successful!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  // Formik doesn't support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //logout handler function
  function userLogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-2xl font-bold">{serverError.message}</h1>;
  return (
    <div className="container mx-auto bg-rose-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "" }}
        >
          {/* Begining of div that contains everything */}

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-center">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">
              Welcome to your profile!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className="img rounded-full  w-20 h-20 border-gray-400 shadow-lg cursor-pointer border-2 hover:border-gray-200 "
                  src={apiData?.profile || file || avater}
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
                {...formik.getFieldProps("firstName")}
                type="text"
                placeholder="Firstname"
                className={`${styles.textbox} ${extend.textbox}`}
              />
              <br />
              <input
                {...formik.getFieldProps("lastName")}
                type="text"
                placeholder="Lastname"
                className={`${styles.textbox} ${extend.textbox}`}
              />
              <br />
              <input
                {...formik.getFieldProps("email")}
                type="email"
                placeholder="Email"
                className={`${styles.textbox} ${extend.textbox}`}
              />
              <div>&nbsp;</div>
              <input
                {...formik.getFieldProps("mobile")}
                type="text"
                placeholder="Mobile No."
                className={`${styles.textbox} ${extend.textbox}`}
              />
              <div>&nbsp;</div>
              <input
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
                className={`${styles.textbox} ${extend.textbox}`}
              />
              <div>&nbsp;</div>
              <button className={styles.btn} type="submit">
                Update Profile
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-400">
                Come back later ?
                <Link
                  onClick={userLogOut}
                  className="underline text-blue-500 italic"
                  to="/"
                >
                  Logout
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
