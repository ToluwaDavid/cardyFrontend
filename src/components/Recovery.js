import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/helper";

import styles from "../styles/Username.module.css";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      // console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      // console.log(OTP);
    });
  }

  //   const formik = useFormik({
  //     initialValues: {
  //       password: "",
  //     },
  //     validate: passwordValidate,
  //     validateOnBlur: false,
  //     validateOnChange: false,
  //     onSubmit: async (values) => {
  //       console.log(values);
  //     },
  //   });
  return (
    <div className="container mx-auto bg-rose-100">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center">
        <div className={styles.glass}>
          {/* Begining of div that contains everything */}

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold text-center">Recover Account</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-400">
              Enter OTP to recover password
            </span>
          </div>

          <form className="py-1" onSubmit={onSubmit}>
            <div className="profile flex justify-center py-4"></div>
            <div className="textbox flex flex-col items-center py-4">
              <div className="input text-center">
                <span className="text-sm text-gray-500 text-center py-4">
                  Enter 6 digit OTP sent to your email address
                </span>
                <br />
                <input
                  type="text"
                  placeholder="OTP"
                  className={styles.textbox}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>

              <div>&nbsp;</div>
              <button className={styles.btn} type="submit">
                Sign Up
              </button>
            </div>
            <div>&nbsp;</div>
          </form>
          <div className="text-center">
            <span className="text-gray-400">
              Can't get OTP?{" "}
              <button
                className="underline text-blue-500 italic"
                onClick={resendOTP}
              >
                Resend
              </button>
            </span>
          </div>

          {/* This div contains everything */}
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}
